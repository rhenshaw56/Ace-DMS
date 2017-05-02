import React from 'react';
import DocCard from './DocCard';

class DocList extends React.Component {
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
                      <div className="col s2">
                        <DocCard
                          title={doc.title}
                          key={doc.title + index}
                          id={doc.id}
                          content={doc.content}
                          auth={this.props.auth}
                          ownerId={doc.ownerId}
                          access={doc.access}
                        />
                      </div>
                    ))
                }
      </div>
    );
  }
}

DocList.propTypes = {
  Docs: React.PropTypes.array.isRequired,
  auth: React.PropTypes.object.isRequired
};


export default DocList;
