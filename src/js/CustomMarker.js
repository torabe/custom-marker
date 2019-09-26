/**
 * class CustomMarker
 */
export default class CustomMarker extends google.maps.OverlayView{
  /**
   * constructor
   * @param object map
   * @param float lat
   * @param float lng
   * @param boolean isDisplay
   * @param boolean isSelected
   */
  constructor(map,lat,lng,isDisplay = true,isSelected = false){
    super();
    this.position = {
      lat:lat,
      lng:lng
    };
    this.isDisplay = isDisplay;
    this.isSelected = isSelected;

    this.setMap(map);

    this.el = null;
  }

  /**
   * onAdd
   */
  onAdd(){
    this.el = document.createElement('div');

    const className = 'custom-marker' + (this.isSelected) ? '--selected': '';
    this.el.classList.add(className);

    if(!this.isDisplay){
      this.el.style.display = 'none';
    }

    const panes = this.getPanes();
    panes.overlayLayer.appendChild(this.el);

    // click event
    panes.overlayMouseTarget.appendChild(this.el);
    google.maps.event.addDomListener(this.el, 'click', () => {
      google.maps.event.trigger(this, 'click');
    });
  }


  /**
   * draw
   */
  draw(){
    if(!this.el) return;

    const point = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(this.position.lat, this.position.lng));
    this.el.style.left = point.x + 'px';
    this.el.style.top = point.y + 'px';
  }

  /**
   * onRemove
   */
  onRemove(){
    if(!this.el) return;
    this.el.parentNode.removeChild(this.el);
    this.el = null;
  }

  /**
   * 選択状態のset
   */
  setSelected(boolean){
    if(boolean === this.isSelected) return;

    this.isSelected = boolean;
    this.switchClass();
  }

  /**
   * 表示フラグのset
   */
  setDisplay(boolean){
    if(boolean === this.isDisplay) return;

    this.isDisplay = boolean;
    this.setStyle();
  }

  /**
   * switch class list
   */
  switchClass(){
    if(!this.el) return;

    const className = 'custom-marker' + (this.isSelected) ? '--selected': '';
    this.el.classList.replace(this.el.classList.item(0),className);
  }

  /**
   * set styles
   */
  setStyle(){
    if(!this.el) return;

    this.el.style.display = (!this.isDisplay) ? 'none' : '';
  }
}