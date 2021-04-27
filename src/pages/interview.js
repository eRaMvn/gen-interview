import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Header,
    Icon,
    Grid,
    Segment,
    Dropdown,
    Message,
    Popup,
    List,
} from 'semantic-ui-react';
import { useReactMediaRecorder } from 'react-media-recorder';
import StopWatch from '../components/StopWatch';
import ResponsiveContainer from '../components/ResponsiveContainer';
import securityQData from '../data/security_questions.json';
import behaviorQData from '../data/behavioral_questions.json';
import { getQuestionByTags, setDropDownValues } from '../helper/common';
import Seo from '../components/Seo';

const InterviewContext = React.createContext();

const InterviewHeader = ({ mobile }) => {
    const {
        setNextStatus,
        allQuestions,
        combinedQuestions,
        setCombinedQuestions,
        questionTypes,
        shownQuestion,
        setShownQuestion,
        recordButtonEnabled,
    } = useContext(InterviewContext);

    // An array containing the already shown question
    const [alreadyShownQs, setAlreadyShownQs] = useState([]);

    const {
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ audio: true });

    const [recordButtonState, setRecordButtonState] = useState(
        'Record Yourself',
    );

    // Function to handle the recording button
    const handleRecorder = () => {
        if (recordButtonState === 'Record Yourself') {
            startRecording();
            setRecordButtonState('Stop Recording...');
        } else {
            stopRecording();
            setRecordButtonState('Record Yourself');
        }
    };

    // Function to handle change in the filter bar for question types
    const handleDropDownChange = (e, { value }) => {
        // Reset the list of questions when the filter changes
        setShownQuestion('Resetting question list...');
        setNextStatus(false);

        let newQuestionList = [];
        for (let selection of value) {
            newQuestionList = [...newQuestionList, ...allQuestions[selection]];
        }
        setCombinedQuestions(newQuestionList);
        setAlreadyShownQs([]);
    };

    const generateRandomQuestion = (questionList) => {
        // If all questions looped through, restart again
        if (alreadyShownQs.length === questionList.length) {
            setAlreadyShownQs([]);
            setShownQuestion(
                questionList[Math.floor(Math.random() * questionList.length)],
            );
            return;
        }

        // Generate a random question
        let question =
            questionList[Math.floor(Math.random() * questionList.length)];

        // If the question already exists in the array alreadyShownQs, generate again
        while (alreadyShownQs.includes(question)) {
            question =
                questionList[Math.floor(Math.random() * questionList.length)];
        }

        setAlreadyShownQs((alreadyShownQs) => [...alreadyShownQs, question]);
        setShownQuestion(question);
        setNextStatus(true);
    };

    return (
        <Container text>
            <Seo title="Interview Questions" />
            <Header
                as="h1"
                content="Question Generator"
                inverted
                style={{
                    fontSize: mobile ? '2em' : '3.5em',
                    fontWeight: 'normal',
                    marginTop: mobile ? '0.5em' : '1.5em',
                }}
            />

            <Grid celled="internally" columns="equal" stackable>
                <Grid.Column>
                    <StopWatch />
                </Grid.Column>
                <Grid.Column>
                    {recordButtonEnabled ? null : (
                        <Message error compact>
                            Please allow access to your microphone to record
                            yourself and reload the page!
                        </Message>
                    )}
                    <Popup
                        trigger={<audio src={mediaBlobUrl} controls />}
                        content="After recording, download audio by clicking play and the three dots"
                        on={['hover', 'click']}
                    />
                    <Button
                        color="red"
                        size="large"
                        onClick={handleRecorder}
                        disabled={!recordButtonEnabled}
                    >
                        {recordButtonState}
                        <Icon name="record right" />
                    </Button>
                </Grid.Column>
            </Grid>

            <Dropdown
                clearable
                fluid
                multiple
                search
                selection
                options={questionTypes}
                placeholder="Select Question Types"
                onChange={handleDropDownChange}
                style={{
                    marginTop: mobile ? '0.25em' : '1.25em',
                    marginBottom: mobile ? '0.25em' : '1.25em',
                }}
            />

            <Button
                primary
                size="large"
                onClick={() => generateRandomQuestion(combinedQuestions)}
            >
                Next
                <Icon name="random right" />
            </Button>

            <p
                style={{
                    marginTop: mobile ? '0.25em' : '1.25em',
                }}
            >
                Question {alreadyShownQs.length} out of{' '}
                {combinedQuestions.length}
            </p>

            <Segment
                inverted
                style={{
                    overflow: 'auto',
                    maxHeight: 100,
                }}
            >
                <Header
                    as="h2"
                    content={shownQuestion}
                    inverted
                    style={{
                        fontSize: mobile ? '1em' : '1.5em',
                        fontWeight: 'normal',
                    }}
                />
            </Segment>
        </Container>
    );
};

InterviewHeader.propTypes = {
    mobile: PropTypes.bool,
};

const InterviewBody = () => {
    const {
        nextButtonClicked,
        allQuestionsData,
        questionTypes,
        shownQuestion,
    } = useContext(InterviewContext);

    const [questionDownloadState, setQuestionDownloadState] = useState();

    // Function to handle change in the dropdown for question types
    const handleDownload = (e, { value }) => {
        setQuestionDownloadState(value);
    };

    return (
        <>
            <Segment style={{ padding: '6em 0em' }} vertical>
                <Grid container stackable verticalAlign="middle">
                    <Grid.Column width={12}>
                        <Header as="h3" style={{ fontSize: '2em' }}>
                            Comment and Context:
                        </Header>
                        <Segment
                            style={{
                                overflow: 'auto',
                                maxHeight: 200,
                                minHeight: 200,
                            }}
                        >
                            <p
                                style={{
                                    fontSize: '1.33em',
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {nextButtonClicked
                                    ? allQuestionsData[shownQuestion].comment[0]
                                    : 'Here I will provide some comments based on my experience answering that question'}
                            </p>
                        </Segment>

                        <Header as="h3" style={{ fontSize: '2em' }}>
                            Resources:
                        </Header>
                        {/* Display the bulleted list of urls if there are any values */}
                        {nextButtonClicked ? (
                            <List bulleted style={{ fontSize: '1.33em' }}>
                                {allQuestionsData[shownQuestion].resources.map(
                                    (url) => (
                                        <List.Item key={url} href={url}>
                                            {url}
                                        </List.Item>
                                    ),
                                )}
                            </List>
                        ) : (
                            <p style={{ fontSize: '1.33em' }}>
                                Here I will provide resources to help answer the
                                question
                            </p>
                        )}
                    </Grid.Column>
                </Grid>
            </Segment>

            <Segment style={{ padding: '6em 0em' }} vertical>
                <Container text>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                        Full list of questions:
                    </Header>
                    <Dropdown
                        placeholder="Select List"
                        fluid
                        selection
                        options={questionTypes}
                        onChange={handleDownload}
                    />

                    <a href={`../${questionDownloadState}_questions.txt`}>
                        <Button
                            size="medium"
                            style={{
                                marginTop: '0.55em',
                            }}
                        >
                            Download Questions Only
                        </Button>
                    </a>

                    <a
                        href={`../${questionDownloadState}_questions_and_resources.txt`}
                    >
                        <Button
                            size="medium"
                            style={{
                                marginTop: '0.55em',
                            }}
                        >
                            Download Questions And Resources
                        </Button>
                    </a>
                </Container>
            </Segment>
        </>
    );
};

const InterviewLayout = () => {
    const [nextButtonClicked, setNextStatus] = useState(false);
    // allQuestionsData is a big objects containing all values in json files in /src/data
    // We use this look up comment and resources
    const [allQuestionsData, setAllQuestionsData] = useState({});
    // allQuestions are all questions under /src/data by roles
    const [allQuestions, setAllQuestions] = useState({});
    // combinedQuestions are the questions combined from the dropdown list
    const [combinedQuestions, setCombinedQuestions] = useState([]);
    // questionTypes are the types of questions shown in the dropdown list
    const [questionTypes, setQuestionTypes] = useState([]);

    const [shownQuestion, setShownQuestion] = useState(
        'Try The Next Button :)',
    );

    const checkIfAudioEnabled = () => {
        navigator.getUserMedia(
            { audio: true },
            function (stream) {
                if (stream.getAudioTracks().length > 0) {
                    enableRecording(true);
                }
            },
            function (e) {
                enableRecording(false);
            },
        );
    };

    const [recordButtonEnabled, enableRecording] = useState(false);

    // Add a new set of data here
    const loadQuestions = () => {
        const allSecurityQs = getQuestionByTags(securityQData, 'all_security');

        const allBehavioralQs = getQuestionByTags(
            behaviorQData,
            'all_behavioral',
        );

        return {
            ...allSecurityQs,
            ...allBehavioralQs,
        };
    };

    useEffect(() => {
        // Add new set of data here
        setAllQuestionsData({
            ...securityQData,
            ...behaviorQData,
        });
        const allLoadedQuestions = loadQuestions();
        setAllQuestions(allLoadedQuestions);
        setQuestionTypes(setDropDownValues(allLoadedQuestions));
        setCombinedQuestions(allLoadedQuestions['all_behavioral']);
        checkIfAudioEnabled();
    }, []);

    const passedContext = {
        nextButtonClicked,
        setNextStatus,
        allQuestionsData,
        allQuestions,
        combinedQuestions,
        setCombinedQuestions,
        questionTypes,
        shownQuestion,
        setShownQuestion,
        recordButtonEnabled,
    };

    return (
        <>
            <InterviewContext.Provider value={passedContext}>
                <ResponsiveContainer
                    header={<InterviewHeader />}
                    body={<InterviewBody />}
                ></ResponsiveContainer>
            </InterviewContext.Provider>
        </>
    );
};

export default InterviewLayout;
