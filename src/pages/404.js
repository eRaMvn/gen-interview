import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';
import ResponsiveContainer from '../components/ResponsiveContainer';
import Seo from '../components/Seo';

const NotFoundHeader = ({ mobile }) => {
    return (
        <Container text>
            <Seo title="404" />
            <Header
                as="h1"
                content="Page Not Found!"
                inverted
                style={{
                    fontSize: mobile ? '2em' : '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: mobile ? '1.5em' : '3em',
                }}
            />
        </Container>
    );
};

NotFoundHeader.propTypes = {
    mobile: PropTypes.bool,
};

const NotFoundLayout = () => (
    <ResponsiveContainer header={<NotFoundHeader />}></ResponsiveContainer>
);

export default NotFoundLayout;
