import React from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Segment,
} from 'semantic-ui-react';
import { StaticImage } from 'gatsby-plugin-image';
import { navigate } from 'gatsby';
import ResponsiveContainer from '../components/ResponsiveContainer';

const HomeHeader = ({ mobile }) => {
    const navigateToInterview = () => {
        navigate('/interview');
    };
    return (
        <Container text>
            <Header
                as="h1"
                content="Welcome!"
                inverted
                style={{
                    fontSize: mobile ? '2em' : '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: mobile ? '1.5em' : '3em',
                }}
            />
            <Header
                as="h2"
                content="Let's practice for interviews with questions"
                inverted
                style={{
                    fontSize: mobile ? '1.5em' : '1.7em',
                    fontWeight: 'normal',
                    marginTop: mobile ? '0.5em' : '1.5em',
                }}
            />
            <Button primary size="huge" onClick={navigateToInterview}>
                Get Started
                <Icon name="right arrow" />
            </Button>
        </Container>
    );
};

HomeHeader.propTypes = {
    mobile: PropTypes.bool,
};

const HomeBody = () => {
    const navigateToSourceCode = () => {
        navigate('https://github.com/eRaMvn/gen-interview');
    };

    return (
        <>
            <Segment style={{ padding: '6em 0em' }} vertical>
                <Grid container stackable verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as="h3" style={{ fontSize: '2em' }}>
                                What is this website?
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                This website was created to help job seekers
                                improve their interview success rates with
                                practice questions from different topics
                                especially in the race to top tech companies
                            </p>
                            <Header as="h3" style={{ fontSize: '2em' }}>
                                Why is this created?
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                Success in interview process requires practice.
                                Practice makes perfect. We give you common
                                questions you may face along with the tools such
                                as stop watch to time yourself and the ability
                                to record yourself to see how you do
                            </p>
                            <Header as="h3" style={{ fontSize: '2em' }}>
                                Why should I use it?
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                The list of questions we have here are based on
                                actual questions asked during phone and onsite
                                interviews. Even though the names of the
                                companies that asked these questions are not
                                mentioned, we believe the questions can help you
                                prepare and avoid surprises.{' '}
                            </p>
                            <p style={{ fontSize: '1.33em' }}>
                                There are comments and resources provided for
                                each question that help provide the perspective
                                on how to answer a particular question. Right
                                now, it is based on the experience of one
                                individual, and it is not guaranteed that
                                following comment would bring success
                            </p>
                        </Grid.Column>
                        <Grid.Column floated="right" width={6}>
                            <StaticImage
                                src="../images/interview.png"
                                alt="Interview"
                                placeholder="blurred"
                                width="300"
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '6em 0em' }} vertical>
                <Container text>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                        How can I contribute to this website?
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        You can add more topics, questions or improve the
                        functionality of this website by making pull requests in
                        the repo of this project. The repo of this project is
                        public. The README there should help you get started.
                    </p>
                    <Button as="a" size="large" onClick={navigateToSourceCode}>
                        Go to the source code
                    </Button>
                </Container>
            </Segment>
        </>
    );
};

const HomepageLayout = () => (
    <ResponsiveContainer
        header={<HomeHeader />}
        body={<HomeBody />}
    ></ResponsiveContainer>
);

export default HomepageLayout;
