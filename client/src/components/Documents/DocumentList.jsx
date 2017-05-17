import React from 'react';
import DocumentCard from './DocumentCard';  // eslint-disable-line

/**
 * @class DocumentList
 * @extends {React.Component}
 */
class DocumentList extends React.Component {
  /**
   * Render function
   * @returns {Object} Jsx
   * @memberOf DocumentList
   */
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
