import React, { Component } from 'react';
import ConfigurationController from '../../controllers/ConfigurationController';
import { Card, Row, Col, Container } from 'react-bootstrap';
import TimerUtil from '../../utils/TimerUtil';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.projectId = 2345186;
    this.state = {
      sprintData: {},
      timeToRelease: 0,
      timeToReview: 0,
      countdownRelease: '',
      countdownReview: ''
    }

    this.startTimer = this.startTimer.bind(this);
    this.getCountdownString = this.getCountdownString.bind(this);
  }

  componentDidMount() {
    ConfigurationController.getLatestSprint(this.projectId).then(res => {
      this.setState({
        sprintData: res.data,
        timeToRelease: Math.floor((new Date(res.data.release_date).getTime() - Date.now()) / 1000),
        timeToReview: Math.floor((new Date(res.data.review_date).getTime() - Date.now()) / 1000)
      })
    });
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => this.getCountdownString(), 1000)
  }

  getCountdownString() {
    this.setState({
      timeToRelease: this.state.timeToRelease - 1,
      timeToReview: this.state.timeToReview - 1,
      countdownRelease: TimerUtil.getCountdownString(this.state.timeToRelease),
      countdownReview: TimerUtil.getCountdownString(this.state.timeToReview),
    })
  }
  
  render() {
    return (
        <Container>
           <br />
           <br />
          <Row>
            <Col>
              <Card className="sprint-card" bg="info" text="white" style={{ width: '16rem'}}>
                <Card.Body>
                  <Card.Text>
                    Sprint {this.state.sprintData.sprint_no}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Card className="date-card" bg="primary" text="white" style={{ width: '18rem'}}>
                <Card.Body>
                  <Card.Text>
                    Next Release Date:
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="date-card" bg="primary" text="white" style={{ width: '18rem'}}>
                <Card.Body>
                  <Card.Text>
                    Next Review Date:
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Card className="date-card" bg="primary" text="white" style={{ width: '18rem'}}>
                <Card.Body>
                  <Card.Text>
                    {new Date(Date.parse(this.state.sprintData.release_date)).toDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="date-card" bg="primary" text="white" style={{ width: '18rem'}}>
                <Card.Body>
                  <Card.Text>
                    {new Date(Date.parse(this.state.sprintData.review_date)).toDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="date-card" bg="primary" text="white" style={{ width: '18rem'}}>
                <Card.Body>
                  <Card.Text>
                    { this.state.countdownRelease }
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="date-card" bg="primary" text="white" style={{ width: '18rem'}}>
                <Card.Body>
                  <Card.Text>
                    { this.state.countdownReview }
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default Home;