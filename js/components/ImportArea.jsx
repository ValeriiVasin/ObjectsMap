import React from 'react';
import Actions from '../actions/projects';

let sample = `
Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude
1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452
2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469
3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191
`;

export default React.createClass({
  onSubmit(event) {
    event.preventDefault();
    Actions.import(this.refs.textarea.getDOMNode().value);
  },

  render() {
    return (
      <form role="form" onSubmit={this.onSubmit}>
        <h1>Import</h1>
        <div className="form-group">
          <textarea
            className="form-control"
            cols="30"
            rows="20"
            placeholder="Insert your data here"
            ref="textarea"
            defaultValue={sample}
            ></textarea>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
});
