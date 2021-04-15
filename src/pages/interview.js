import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Header,
    Icon,
    Grid,
    Segment,
    Dropdown
} from 'semantic-ui-react';
import ResponsiveContainer from '../components/ResponsiveContainer';
import securityQData from '../data/security.json'
import behaviorQData from '../data/behavioral.json'


const questionTypes = [
    { key: 'sec', value: 'sec', text: 'security' },
    { key: 'swe', value: 'swe', text: 'software engineering' },
    { key: 'be', value: 'be', text: 'behavioral' },
]


const InterviewHeader = ({ mobile }) => {
    const [dropDownState, setDropDownState] = useState([])

    const handleDropDownChange = (e, {value}) => {
        setDropDownState(value)
    }

    const [securityQuestions, setSecurityQuestions] = useState({})
    const [behavioralQuestions, setBehavioralQuestions] = useState({})
    console.log(behavioralQuestions)

    const [shownQuestion, setShownQuestion] = useState("Try The Next Button :)")
    // An array containing the already shown question
    const [alreadyShownQs, setAlreadyShownQs] = useState([])

    const generateRandomQuestion = (questionDict) => {
        const keys = Object.keys(questionDict);
        // If all questions looped through, restart again
        if (alreadyShownQs.length === keys.length) {
            setAlreadyShownQs([])
            setShownQuestion(keys[Math.floor(Math.random() * keys.length)])
            return
        }

        while (true) {
            const question = keys[Math.floor(Math.random() * keys.length)];
            if (alreadyShownQs.includes(question)) {
                continue
            }
            setAlreadyShownQs(alreadyShownQs => [...alreadyShownQs, question])
            setShownQuestion(question)
            return
        }

    }

    useEffect(() => {
        setSecurityQuestions(securityQData)
        setBehavioralQuestions(behaviorQData)
    }, [])

    return (
    <Container text>
        <Header
            as="h1"
            content="Question Generator"
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Dropdown
            clearable
            fluid
            multiple
            search
            selection
            options={questionTypes}
            placeholder='Select Question Types'
            onChange={handleDropDownChange}
            style={{
                marginBottom: mobile ? '0.25em' : '1.25em',
            }}
        />

        <Button primary size="huge" onClick={() => generateRandomQuestion(securityQuestions)}>
            Next
            <Icon name="random right" />
        </Button>
        <Button color="red" size="huge">
            Record
            <Icon name="record right" />
        </Button>

        <p style={{
                marginTop: mobile ? '0.25em' : '1.25em',
            }}>Question 1 out of 100</p>

        <Header
            as="h2"
            content={shownQuestion}
            inverted
            style={{
                fontSize: mobile ? '0.5em' : '2.5em',
                fontWeight: 'normal',
            }}
        />
    </Container>
)};

InterviewHeader.propTypes = {
    mobile: PropTypes.bool,
};

const InterviewBody = () => {
    return (
        <>
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as="h3" style={{ fontSize: '2em' }}>
                               Comment and Context:
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                We can give your company superpowers to do
                                things that they never thought possible. Let us
                                delight your customers and empower your needs...
                                through pure data analytics.
                            </p>
                            <Header as="h3" style={{ fontSize: '2em' }}>
                               Resources:
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                Yes that's right, you thought it was the stuff
                                of dreams, but even bananas can be
                                bioengineered.
                            </p>
                        </Grid.Column>
                        <Grid.Column floated="right" width={6}>
                            <Header as="h3" style={{ fontSize: '2em' }}>
                                Full list of questions:
                            </Header>
                            <Dropdown
                                placeholder='Select List'
                                fluid
                                selection
                                options={questionTypes}

                            />
                            <Button size="medium" style={{
                                    marginTop: '0.55em',
                                }}>Download</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </>
    );
};

const InterviewLayout = () => (
    <ResponsiveContainer
        header={<InterviewHeader />}
        body={<InterviewBody />}
    ></ResponsiveContainer>
);

export default InterviewLayout;