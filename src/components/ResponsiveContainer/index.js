import React, { useState } from 'react';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import {
    Container,
    Icon,
    Menu,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react';
import Footer from '../Footer';

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
});

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
const DesktopContainer = ({ header, body }) => {
    const location = useLocation();
    const [menuState, setMenuState] = useState(false);
    const [activeMenu, setActiveMenu] = useState(location.pathname);

    const showFixedMenu = () => {
        setMenuState(true);
    };

    const hideFixedMenu = () => {
        setMenuState(false);
    };

    const setHomeActive = () => {
        setActiveMenu('/');
        navigate('/');
    };

    const setInterviewActive = () => {
        setActiveMenu('/interview');
        navigate('/interview');
    };

    return (
        <Media greaterThan="mobile">
            <Visibility
                once={menuState}
                onBottomPassed={showFixedMenu}
                onBottomPassedReverse={hideFixedMenu}
            >
                <Segment
                    inverted
                    textAlign="center"
                    style={{ minHeight: 700, padding: '1em 0em' }}
                    vertical
                >
                    <Menu
                        fixed={menuState ? 'top' : null}
                        inverted={!menuState}
                        pointing={!menuState}
                        secondary={!menuState}
                        size="large"
                    >
                        <Container>
                            <Menu.Item
                                as="a"
                                active={activeMenu === '/'}
                                onClick={setHomeActive}
                            >
                                Home
                            </Menu.Item>
                            <Menu.Item
                                as="a"
                                active={activeMenu === '/interview'}
                                onClick={setInterviewActive}
                            >
                                Interview
                            </Menu.Item>
                            {/* <Menu.Item position="right">
                                <Button as="a" inverted={!menuState}>
                                    Log in
                                </Button>
                                <Button
                                    as="a"
                                    inverted={!menuState}
                                    primary={menuState}
                                    style={{ marginLeft: '0.5em' }}
                                >
                                    Sign Up
                                </Button>
                            </Menu.Item> */}
                        </Container>
                    </Menu>
                    {header}
                </Segment>
            </Visibility>

            {body}
            <Footer />
        </Media>
    );
};

DesktopContainer.propTypes = {
    children: PropTypes.node,
};

const MobileContainer = ({ header, body }) => {
    const location = useLocation();
    const [sidebarState, setSideBarState] = useState(true);
    const [activeMenu, setActiveMenu] = useState(location.pathname);

    const handleSidebarHide = () => setSideBarState(false);

    const handleToggle = () => setSideBarState(true);

    const setHomeActive = () => {
        setActiveMenu('/');
        navigate('/');
    };

    const setInterviewActive = () => {
        setActiveMenu('/interview');
        navigate('/interview');
    };

    return (
        <Media as={Sidebar.Pushable} at="mobile">
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    inverted
                    onHide={handleSidebarHide}
                    vertical
                    visible={sidebarState}
                >
                    <Menu.Item
                        as="a"
                        active={activeMenu === '/'}
                        onClick={setHomeActive}
                    >
                        Home
                    </Menu.Item>
                    <Menu.Item
                        as="a"
                        active={activeMenu === '/interview'}
                        onClick={setInterviewActive}
                    >
                        Interview
                    </Menu.Item>
                    {/* <Menu.Item as="a">Log in</Menu.Item>
                    <Menu.Item as="a">Sign Up</Menu.Item> */}
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarState}>
                    <Segment
                        inverted
                        textAlign="center"
                        style={{ minHeight: 350, padding: '1em 0em' }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size="large">
                                <Menu.Item onClick={handleToggle}>
                                    <Icon name="sidebar" />
                                </Menu.Item>
                                {/* <Menu.Item position="right">
                                    <Button as="a" inverted>
                                        Log in
                                    </Button>
                                    <Button
                                        as="a"
                                        inverted
                                        style={{ marginLeft: '0.5em' }}
                                    >
                                        Sign Up
                                    </Button>
                                </Menu.Item> */}
                            </Menu>
                        </Container>
                        {React.cloneElement(header, { mobile: true })}
                    </Segment>

                    {body}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Media>
    );
};

MobileContainer.propTypes = {
    children: PropTypes.node,
};

const ResponsiveContainer = ({ header, body }) => (
    <MediaContextProvider>
        <DesktopContainer header={header} body={body}></DesktopContainer>
        <MobileContainer header={header} body={body}></MobileContainer>
    </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
};

export default ResponsiveContainer;
