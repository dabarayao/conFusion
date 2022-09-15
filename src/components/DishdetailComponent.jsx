import React, { Component } from 'react';
import { Media, Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";
import {
    Button, Modal, ModalBody, ModalHeader, Label, Row, Col
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

/*
class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }
  
  

  componentDidMount() {
    console.log("Dishdetail Component componentDidMount constructor is invoked");
  }

  componentDidUpdate() {
    console.log("Dishdetail Component componentDidUpdate constructor is invoked");
  }

  renderDish(dish) {
    if (dish != null) {
        return (
        <>
            <div  className="col-12 col-md-5 m-1">
                <Card>
                <CardImg top src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <h5 className="card-title">{dish.name}</h5>
                    <CardText>{dish.description}</CardText>
                </CardBody>
                </Card>
                    
            </div>
            <div  className="col-12 col-md-5 m-1">
                <Card>
                <CardBody>
                   <h4 className="card-title">Comments</h4>
                            {dish.comments.map((coms) => {
                                let dateOne = new Date(coms.date)
                                return (
                                    <div>
                                        <p>{coms.comment}</p>
                                        <p>-- {coms.author}, {dateOne.toString().substring(3, 15)}</p>
                                    </div>
                                );
                            })       
                            }
                </CardBody>
                </Card>
                    
            </div>
        </>
        
      );
    } else {
      return (<div>
        
      </div>);
    }
  }
    
  render() {
      
      console.log("Dishdetail Component render constructor is invoked");

      return (
          <div className="container">

            <div className="row">
                      {this.renderDish(this.props.selectedDish)}
            </div>
          </div>
        );
    }
}

*/

const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isCommentFormModalOpen: false
        };

        this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
        this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);

    }

    handleCommentFormSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));


    }

    toggleCommentFormModal() {
        this.setState({
            isCommentFormModalOpen: !this.state.isCommentFormModalOpen
        });
    }


    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleCommentFormModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>


                {/* commentform  Modal */}
                <Modal isOpen={this.state.isCommentFormModalOpen} toggle={this.toggleCommentFormModal} >
                  <ModalHeader toggle={this.toggleCommentFormModal}> Submit Comment </ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>

                            {/* rating */}
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12} >Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating"
                                        className="form-control"
                                        name="rating"
                                        id="rating"
                                        validators={{
                                            required
                                        }}
                                    >
                                        <option>Please Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>


                            {/* author */}
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}> Your Name </Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>




                            {/* comment */}
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>

                            </Row>

                            {/* submit button */}
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>

                    </ModalBody>
                </Modal>


            </React.Fragment>
        );
    }
}

function RenderDish({dish}) {

    if (dish != null) {
    return (
        <div  className="col-12 col-md-5 m-1">
            <Card>
            <CardImg top src={dish.image} alt={dish.name}></CardImg>
            <CardBody>
                <h5 className="card-title">{dish.name}</h5>
                <CardText>{dish.description}</CardText>
            </CardBody>
            </Card>
                
        </div>
    
  );
} else {
  return (<div>
    
  </div>);
}

}

function RenderComments({ comments }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardBody>
          <h4 className="card-title">Comments</h4>
          {comments.map((coms) => {
            let dateOne = new Date(coms.date)
            return (
              <div>
                <p>{coms.comment}</p>
                <p>-- {coms.author}, {dateOne.toString().substring(3, 15)}</p>
              </div>
            );
          })
          }
          <CommentForm  comments={comments} />
        </CardBody>
      </Card>
    </div>);
}


const  DishDetail = (props) => {

  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>

              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
          </div>                
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
        
          <RenderComments comments={props.comments} />

        </div>
      </div>
    );
  } else {
    return (<div></div>);
  }
}

export default DishDetail;