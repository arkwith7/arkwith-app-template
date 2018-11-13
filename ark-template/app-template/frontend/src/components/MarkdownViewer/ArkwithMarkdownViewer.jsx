import React from "react";
import PropTypes from "prop-types";
//Reading Markdown file...
import ReactMarkdown from "react-markdown";

class ArkwithMarkdownViewer extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        md: ''
      };
    }
  
    componentDidMount() {
      if (this.props.markdown !== void 0) {
        this.setState({
          md: this.props.markdown
        });
      }
  
      if (this.props.markdown === '' && this.props.fileName !== void 0) {
        this.fetchFile(this.props.fileName).then(res => {
          this.setState({
            md: res
          });
        });
      }
    }
  
  
    // fetch the md file
    fetchFile(file) {
      let request = new Request(file, {
        headers: new Headers({
          'Content-Type': 'text/plain'
        })
      });
  
      return fetch(request).then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
  
        return res.text().then(text => {
          return text;
        });
      }).catch(err => {
        throw new Error('Failed fetching file: ' + err.message);
      });
    }
  
 
    render() {
      return (
        <div className="react-md">
          <ReactMarkdown source={this.state.md} />
        </div>
      );
    }
  }
  
  ArkwithMarkdownViewer.propTypes = {
    markdown: PropTypes.string,
    fileName: PropTypes.string
  };
  
  ArkwithMarkdownViewer.defaultProps = {
    markdown: '',
    fileName: ''
  };
  
  export default ArkwithMarkdownViewer;