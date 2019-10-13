class TagForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:''}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.tag.value});
    }

    handleSubmit(event) {
        
    }

    render(){
        return ();
    }
}
