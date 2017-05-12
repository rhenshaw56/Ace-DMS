import React from 'react';
import DocumentCard from './DocumentCard';

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this
          .props
          .Docs
          .map((doc, index) => (
            <div className="col s3">
              <DocumentCard
                title={doc.title}
                key={doc.title + index} // eslint-disable-line
                id={doc.id}
                content={doc.content}
                auth={this.props.auth}
                ownerId={doc.ownerId}
                access={doc.access}
                date={doc.createdAt}
              />
              <div className="farce" />
            </div>
                    ))
                }
      </div>
    );
  }
}

DocumentList.propTypes = {
  Docs: React.PropTypes.array.isRequired,
  auth: React.PropTypes.object.isRequired
};


export default DocumentList;
