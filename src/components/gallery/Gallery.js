import  React from 'react';
import '../gallery/Gallery.css';

class Gallery extends React.Component {

  render() {
    return(
      <div className="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        ...
      </div>
    );
  }
}
export default Gallery;