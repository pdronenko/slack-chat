import React from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { setLocale } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import ReactCountryFlag from 'react-country-flag';

const mapStateToProps = ({ i18n: { locale } }) => ({ locale });
const mapDispatchToProps = (dispatch) => {
  const actions = { setLocale };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

const renderFlag = locale => (<ReactCountryFlag code={locale === 'en' ? 'gb' : locale} svg />);

export default @connect(mapStateToProps, mapDispatchToProps)
class Navigation extends React.Component {
  handleChangeLanguage = (e) => {
    e.preventDefault();
    const { language } = e.target.closest('a').dataset;
    const { actions } = this.props;
    actions.setLocale(language);
  }

  render() {
    const { locale } = this.props;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Slack Chat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title={renderFlag(locale)} id="basic-nav-dropdown">
              <NavDropdown.Item href="#english" onClick={this.handleChangeLanguage} data-language="en">
                {renderFlag('en')}
                {'  English'}
              </NavDropdown.Item>
              <NavDropdown.Item href="#russian" onClick={this.handleChangeLanguage} data-language="ru">
                {renderFlag('ru')}
                {'  Русский'}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
