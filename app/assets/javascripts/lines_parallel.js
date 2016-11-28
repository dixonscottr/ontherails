// Parallel Polylines
//
// Bill Chadwick March 2008
//
// Free for any use
//

// Constructor params exactly as GPolyline then a gap width in pixels

function BDCCParallelLines(points, color, weight, opacity, opts, gapPx) {

    this.gapPx = gapPx;
    this.points = points;
    this.color = color;
    this.weight = weight;
    this.opacity = opacity;
    this.opts = opts;
    this.line1 = null;
    this.line2 = null;
    this.lstnZoom = null;
}
BDCCParallelLines.prototype = new GOverlay();

// BDCCParallelLines implements the GOverlay interface
// That is it implements the functions initialize, remove, copy and redraw
//

BDCCParallelLines.prototype.initialize = function(map) {
    this.map = map;
    this.prj = map.getCurrentMapType().getProjection();
    var rdrw = GEvent.callback(this,this.recalc );//redraw on zoom changes
  	this.lstnZoom = GEvent.addListener(map,"zoomend",function(){rdrw ();});
  	this.recalc();//first draw
}

BDCCParallelLines.prototype.remove = function() {

    if(this.line2)
        this.map.removeOverlay(this.line2);
    if(this.line1)
        this.map.removeOverlay(this.line1);
    if(this.lstnZoom != null)
		GEvent.removeListener(this.lstnZoom);

}

BDCCParallelLines.prototype.copy = function(map) {
    return new BDCCParallelLines(this.points,this.color,this.weight,this.opacity,this.opts,this.gapPx);
}

BDCCParallelLines.prototype.redraw = function(force) {
    return; //do nothing
}


BDCCParallelLines.prototype.recalc = function() {

   var zoom = this.map.getZoom();

   //left and right swapped throughout!

   var pts1 = new Array();//left side of center
   var pts2 = new Array();//right side of center

   //shift the pts array away from the centre-line by half the gap + half the line width
   var o = (this.gapPx + this.weight)/2;

   var p2l,p2r;

   for (var i=1; i<this.points.length; i++){

      var p1lm1;
      var p1rm1;
      var p2lm1;
      var p2rm1;
      var thetam1;

      var p1 = this.prj.fromLatLngToPixel(this.points[i-1],  zoom)
      var p2 = this.prj.fromLatLngToPixel(this.points[i],  zoom)
      var theta = Math.atan2(p1.x-p2.x,p1.y-p2.y) + (Math.PI/2);
      var dl = Math.sqrt(((p1.x-p2.x)*(p1.x-p2.x))+((p1.y-p2.y)*(p1.y-p2.y)));

      if(theta > Math.PI)
          theta -= Math.PI*2;
      var dx = Math.round(o * Math.sin(theta));
      var dy = Math.round(o * Math.cos(theta));

      var p1l = new GPoint(p1.x+dx,p1.y+dy);
      var p1r = new GPoint(p1.x-dx,p1.y-dy);
      p2l = new GPoint(p2.x+dx,p2.y+dy);
      p2r = new GPoint(p2.x-dx,p2.y-dy);

      if(i==1){   //first point
        pts1.push(this.prj.fromPixelToLatLng(p1l,zoom));
        pts2.push(this.prj.fromPixelToLatLng(p1r,zoom));
      }
      else{ // mid points

        if(theta == thetam1){
            // adjacent segments in a straight line
            pts1.push(this.prj.fromPixelToLatLng(p1l,zoom));
            pts2.push(this.prj.fromPixelToLatLng(p1r,zoom));
        }
        else{
            var pli = this.intersect(p1lm1,p2lm1,p1l,p2l);
            var pri = this.intersect(p1rm1,p2rm1,p1r,p2r);

            var dlxi = (pli.x-p1.x);
            var dlyi = (pli.y-p1.y);
            var drxi = (pri.x-p1.x);
            var dryi = (pri.y-p1.y);
		var di = Math.sqrt((drxi*drxi)+(dryi*dryi));
            var s = o / di;

            var dTheta = theta - thetam1;
            if(dTheta < (Math.PI*2))
                dTheta += Math.PI*2;
            if(dTheta > (Math.PI*2))
                dTheta -= Math.PI*2;

            if(dTheta < Math.PI){
               //intersect point on outside bend
               pts1.push(this.prj.fromPixelToLatLng(p2lm1,zoom));
               pts1.push(this.prj.fromPixelToLatLng(new GPoint(p1.x+(s*dlxi),p1.y+(s*dlyi)),zoom));
               pts1.push(this.prj.fromPixelToLatLng(p1l,zoom));
            }
		else if (di < dl){
               pts1.push(this.prj.fromPixelToLatLng(pli,zoom));
		}
            else{
               pts1.push(this.prj.fromPixelToLatLng(p2lm1,zoom));
               pts1.push(this.prj.fromPixelToLatLng(p1l,zoom));
		}

            dxi = (pri.x-p1.x)*(pri.x-p1.x);
            dyi = (pri.y-p1.y)*(pri.y-p1.y);
            if(dTheta > Math.PI){
               //intersect point on outside bend
               pts2.push(this.prj.fromPixelToLatLng(p2rm1,zoom));
               pts2.push(this.prj.fromPixelToLatLng(new GPoint(p1.x+(s*drxi),p1.y+(s*dryi)),zoom));
               pts2.push(this.prj.fromPixelToLatLng(p1r,zoom));
            }
		else if(di<dl)
               pts2.push(this.prj.fromPixelToLatLng(pri,zoom));
            else{
               pts2.push(this.prj.fromPixelToLatLng(p2rm1,zoom));
               pts2.push(this.prj.fromPixelToLatLng(p1r,zoom));
		}
        }
      }

      p1lm1 = p1l;
      p1rm1 = p1r;
      p2lm1 = p2l;
      p2rm1 = p2r;
      thetam1 = theta;
   }

   pts1.push(this.prj.fromPixelToLatLng(p2l,zoom));//final point
   pts2.push(this.prj.fromPixelToLatLng(p2r,zoom));

   if(this.line1)
        this.map.removeOverlay(this.line1);
   this.line1 = new GPolyline(pts1,this.color,this.weight,this.opacity,this.opts);
   this.map.addOverlay(this.line1);

   if(this.line2)
        this.map.removeOverlay(this.line2);
   this.line2 = new GPolyline(pts2,this.color,this.weight,this.opacity,this.opts);
   this.map.addOverlay(this.line2);

}

BDCCParallelLines.prototype.intersect = function(p0,p1,p2,p3)
{
// this function computes the intersection of the sent lines p0-p1 and p2-p3
// and returns the intersection point,

var a1,b1,c1, // constants of linear equations
    a2,b2,c2,
    det_inv,  // the inverse of the determinant of the coefficient matrix
    m1,m2;    // the slopes of each line

var x0 = p0.x;
var y0 = p0.y;
var x1 = p1.x;
var y1 = p1.y;
var x2 = p2.x;
var y2 = p2.y;
var x3 = p3.x;
var y3 = p3.y;

// compute slopes, note the cludge for infinity, however, this will
// be close enough

if ((x1-x0)!=0)
   m1 = (y1-y0)/(x1-x0);
else
   m1 = 1e+10;   // close enough to infinity

if ((x3-x2)!=0)
   m2 = (y3-y2)/(x3-x2);
else
   m2 = 1e+10;   // close enough to infinity

// compute constants

a1 = m1;
a2 = m2;

b1 = -1;
b2 = -1;

c1 = (y0-m1*x0);
c2 = (y2-m2*x2);

// compute the inverse of the determinate

det_inv = 1/(a1*b2 - a2*b1);

// use Kramers rule to compute xi and yi

var xi=((b1*c2 - b2*c1)*det_inv);
var yi=((a2*c1 - a1*c2)*det_inv);

return new GPoint(Math.round(xi),Math.round(yi));

}
