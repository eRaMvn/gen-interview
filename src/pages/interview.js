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

const questionTypes = [
    { key: 'sec', value: 'security_questions', text: 'security' },
    { key: 'swe', value: 'swe_questions', text: 'software engineering' },
    { key: 'be', value: 'behavioral_questions', text: 'behavioral' },
];

const InterviewContext = React.createContext();

const InterviewHeader = ({ mobile }) => {
    const {
        setNextStatus,
        securityQuestions,
        behavioralQuestions,
        combinedQuestions,
        setCombinedQuestions,
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

    const questionLookUpDict = {
        security_questions: securityQuestions,
        behavioral_questions: behavioralQuestions,
    };

    // Function to handle change in the filter bar for question types
    const handleDropDownChange = (e, { value }) => {
        // Reset the list of questions when the filter changes
        setShownQuestion('Resetting question list...');
        setNextStatus(false);

        let newQuestionSet = {};
        for (let selection of value) {
            newQuestionSet = {
                ...newQuestionSet,
                ...questionLookUpDict[selection],
            };
        }
        setCombinedQuestions(newQuestionSet);
        setAlreadyShownQs([]);
    };

    const generateRandomQuestion = (questionDict) => {
        const keys = Object.keys(questionDict);
        // If all questions looped through, restart again
        if (alreadyShownQs.length === keys.length) {
            setAlreadyShownQs([]);
            setShownQuestion(keys[Math.floor(Math.random() * keys.length)]);
            return;
        }

        // Generate a random question
        let question = keys[Math.floor(Math.random() * keys.length)];

        // If the question already exists in the array alreadyShownQs, generate again
        while (alreadyShownQs.includes(question)) {
            question = keys[Math.floor(Math.random() * keys.length)];
        }

        setAlreadyShownQs((alreadyShownQs) => [...alreadyShownQs, question]);
        setShownQuestion(question);
        setNextStatus(true);
    };

    return (
        <Container text>
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
                {Object.keys(combinedQuestions).length}
            </p>

            <Header
                as="h2"
                content={shownQuestion}
                inverted
                style={{
                    fontSize: mobile ? '1em' : '1.5em',
                    fontWeight: 'normal',
                }}
            />
        </Container>
    );
};

InterviewHeader.propTypes = {
    mobile: PropTypes.bool,
};

const InterviewBody = () => {
    const { nextButtonClicked, combinedQuestions, shownQuestion } = useContext(
        InterviewContext,
    );

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
                        <p
                            style={{
                                fontSize: '1.33em',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {nextButtonClicked
                                ? combinedQuestions[shownQuestion].comment
                                : 'Here I will provide some comments based on my experience answering that question'}
                        </p>
                        <Header as="h3" style={{ fontSize: '2em' }}>
                            Resources:
                        </Header>
                        {/* Display the bulleted list of urls if there are any values */}
                        {nextButtonClicked ? (
                            <List bulleted style={{ fontSize: '1.33em' }}>
                                {combinedQuestions[shownQuestion].resources.map(
                                    (url) => (
                                        <List.Item href={url}>{url}</List.Item>
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

                    <a href={`../${questionDownloadState}.txt`}>
                        <Button
                            size="medium"
                            style={{
                                marginTop: '0.55em',
                            }}
                        >
                            Download Questions Only
                        </Button>
                    </a>

                    <a href={`../${questionDownloadState}_and_resources.txt`}>
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
    const [securityQuestions, setSecurityQuestions] = useState({});
    const [behavioralQuestions, setBehavioralQuestions] = useState({});
    const [combinedQuestions, setCombinedQuestions] = useState({});
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

    useEffect(() => {
        setSecurityQuestions(securityQData);
        setBehavioralQuestions(behaviorQData);
        setCombinedQuestions(behaviorQData);
        checkIfAudioEnabled();
    }, []);

    const passedContext = {
        nextButtonClicked,
        setNextStatus,
        securityQuestions,
        behavioralQuestions,
        combinedQuestions,
        setCombinedQuestions,
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
