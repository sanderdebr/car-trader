import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import MainNavbar from "components/Navbars/MainNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";

// index page sections
import Hero from "./IndexSections/Hero.jsx";
import Buttons from "./IndexSections/Buttons.jsx";
import Inputs from "./IndexSections/Inputs.jsx";
import CustomControls from "./IndexSections/CustomControls.jsx";
import Menus from "./IndexSections/Menus.jsx";
import Navbars from "./IndexSections/Navbars.jsx";
import Tabs from "./IndexSections/Tabs.jsx";
import Progress from "./IndexSections/Progress.jsx";
import Pagination from "./IndexSections/Pagination.jsx";
import Pills from "./IndexSections/Pills.jsx";
import Labels from "./IndexSections/Labels.jsx";
import Alerts from "./IndexSections/Alerts.jsx";
import Typography from "./IndexSections/Typography.jsx";
import Modals from "./IndexSections/Modals.jsx";
import Datepicker from "./IndexSections/Datepicker.jsx";
import TooltipPopover from "./IndexSections/TooltipPopover.jsx";
import Carousel from "./IndexSections/Carousel.jsx";
import Icons from "./IndexSections/Icons.jsx";
import Login from "./IndexSections/Login.jsx";
import Download from "./IndexSections/Download.jsx";


class Home extends Component {

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    const { isLoggingOut, logoutError } = this.props;
    return (
        <>
        <MainNavbar />
        <main ref="main">
        <Hero />
        <h1>This is your app's protected area.</h1>
        <p>Any routes here will also be protected</p>
        <button onClick={this.handleLogout}>Logout</button>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
        <Buttons />
        <Inputs />
        <section className="section">
            <Container>
            <CustomControls />
            <Menus />
            </Container>
        </section>
        <Navbars />
        <section className="section section-components">
            <Container>
            <Tabs />
            <Row className="row-grid justify-content-between align-items-center mt-lg">
                <Progress />
                <Pagination />
            </Row>
            <Row className="row-grid justify-content-between">
                <Pills />
                <Labels />
            </Row>
            <Alerts />
            <Typography />
            <Modals />
            <Datepicker />
            <TooltipPopover />
            </Container>
        </section>
        <Carousel />
        <Icons />
        <Login />
        <Download />
        </main>
        <CardsFooter />
        </>

    );
  }

}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}

export default connect(mapStateToProps)(Home);