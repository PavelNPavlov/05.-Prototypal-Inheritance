/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
	  * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * // method removeAttribute(attribute)
*/


/* Example

var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)

var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);

console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/


function solve() {
	var domElement = (function () {
		var domElement = {
			init: function(type) {


				//bullet 1
				this.type=type;
				this._content='';
				this.attributes=[];
				this._children=[];
				this.parent;

				return this;

			},
			appendChild: function(child) {
				if(typeof(child)!=='string'){
					child.parent = this;
				}

				this._children.push(child);

				return this;
			},
			addAttribute: function(name, value) {
				if(!name){
					throw new Error();
				}
				checkAttributeName(name);
				var attribute=creatAttribute(name,value);
				var index=indexOfRepeatingAttribute(this.attributes,attribute);
				if(index===-1){
					this.attributes.push(attribute);
				} else{
					this.attributes[index].value=value;
				}

				this.attributes=this.attributes.sort(function(a,b){
					if(a.name> b.name){
						return 1;
					}
					if(a.name< b.name){
						return -1;
					}
					if(a.name=== b.name){
						return 0;
					}
				});
				return this;
			},

			removeAttribute: function(attribute){
				if (this.attributes[attribute] !== undefined) {
					delete this.attributes[attribute];
				} else {
					throw 'No such attribute';
				}
				return this;
			},

			//bullet 3
      		get innerHTML(){

        		var result='';
				var inner;
				/*if(typeof (this)==='string'){
					return result;
				}*/
				result +='<';
				result +=this.type; // opening tagg
				//atributes
				for(var i in this.attributes){
					result +=' '+ this.attributes[i].name +'="'+this.attributes[i].value+'"';
				}
				result=result.trimRight();
				result +='>';//close open tag

				if(this.children.length>0) {
					this.children.forEach(function(item){
						typeof item === 'string' ? result += item : result += item.innerHTML;
					})
				} else {
					result += this.content;
				}

				result +=('</'+this.type+'>'); //close tag
				return result;
      		},

			//bullet 2 property - get/set
			get type(){
				return this._type;
			},
			set type(value){
				if (value === '' || value.match(/[^\w]/)) {
					throw 'Letters and digits only';
				}

				this._type = value;
			},

			//content of type string property => get i set
			get content(){

				return this._content;
			},
			set content(value){
				if(!this.hasChildren){
					this._content=value;
				}
			},
			get parent (){
				return this._parrent;
			},
			set parent(value){
				this._parrent=value;
			},
			get children(){
				return this._children;
			}


			//bullet 5


		};
		function checkAttributeName(name){
			if(!/^[a-zA-Z0-9-_]+$/.test(name) && name.length>0) {
				throw new Error('Validate type');
			}
		}
		function creatAttribute(name,value){
			return {
				name: name,
				value: value
			}
		}
		function indexOfRepeatingAttribute(collection,attribute){
			for(var k in collection){
				if(collection[k].name===attribute.name){
					return k;
				}
			}
			return -1;
		}
		return domElement;
	} ());
	return domElement;
}


module.exports = solve;
