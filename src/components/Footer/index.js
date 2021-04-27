import React from 'react';
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';
import { navigate } from 'gatsby';

export default function Footer() {
    const navigateToSourceCode = () => {
        navigate('https://github.com/eRaMvn/gen-interview');
    };

    return (
        <Segment inverted vertical style={{ padding: '3em 0em' }}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as="h4" content="About" />
                            <List link inverted>
                                <List.Item
                                    as="a"
                                    onClick={navigateToSourceCode}
                                >
                                    Project Contribution
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as="h4" inverted>
                                Disclaimer
                            </Header>
                            <p>
                                This project does not guarantee success in
                                interviews. Please use it as another resource
                                for interview practice
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    );
}
