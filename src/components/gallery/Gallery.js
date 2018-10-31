import  React from 'react';
import '../gallery/Gallery.css';
import Masonry from 'masonry-layout';

class Gallery extends React.Component {

  componentDidMount() {
    var grid = document.querySelector('.grid');
    var msnry = new Masonry( grid, {
      // options...
      itemSelector: '.grid-item',
      columnWidth: 200
    });

    // init with selector
    var msnry = new Masonry( '.grid', {
      // options...
    });
  }

  render() {
    return(
      <div className="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
        <div className="grid-item">fsdf</div>
        <div className="grid-item">fsdf</div>
      </div>
    );
  }
}
export default Gallery;