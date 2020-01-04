
import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import MainNavbar from "components/Navbars/MainNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class Login extends React.Component {

  state = { email: "", password: "" };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  render() {
    const { classes, loginError, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/Home" />;
    } else { 

      return (
        <>
          <MainNavbar />
          <main ref="main">
            <section className="section section-shaped section-lg">
              <div className="shape shape-style-1 bg-gradient-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="pt-lg-md">
                <Row className="justify-content-center">
                  <Col lg="5">
                    <Card className="bg-secondary shadow border-0">
                      <CardHeader className="bg-white pb-5">
                        <div className="text-muted text-center mb-3">
                          <small>Sign in with</small>
                        </div>
                        <div className="btn-wrapper text-center">
                          <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <span className="btn-inner--icon mr-1">
                              <img
                                alt="..."
                                src={require("assets/img/icons/common/github.svg")}
                              />
                            </span>
                            <span className="btn-inner--text">Github</span>
                          </Button>
                          <Button
                            className="btn-neutral btn-icon ml-1"
                            color="default"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <span className="btn-inner--icon mr-1">
                              <img
                                alt="..."
                                src={require("../assets/img/icons/common/google.svg")}
                              />
                            </span>
                            <span className="btn-inner--text">Google</span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                          <small>Or sign in with credentials</small>
                        </div>
                        <Form role="form">
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Email" type="email" name="email" onChange={this.handleEmailChange} />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Password"
                                type="password"
                                autoComplete="off"
                                name="password"
                                onChange={this.handlePasswordChange}
                              />
                            </InputGroup>
                          </FormGroup>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id=" customCheckLogin"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor=" customCheckLogin"
                            >
                              <span>Remember me</span>
                            </label>
                          </div>
                          <div className="text-center">
                            <Button
                              className="my-4"
                              color="primary"
                              type="button"
                              onClick={this.handleSubmit}
                            >
                              Sign in
                            </Button>
                          </div>
                          {loginError && (
                              <div className="text-center">
                                <small style={{color: 'red'}}>
                                  Incorrect email or password.
                                </small>
                              </div>
                            )}
                        </Form>
                      </CardBody>
                    </Card>
                    <Row className="mt-3">
                      <Col xs="6">
                        <a
                          className="text-light"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <small>Forgot password?</small>
                        </a>
                      </Col>
                      <Col className="text-right" xs="6">
                        <a
                          className="text-light"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <small>Create new account</small>
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
          </main>
          <SimpleFooter />
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Login);