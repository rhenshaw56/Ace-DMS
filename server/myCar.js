/**
 * Car class
 */
export default class Car {
  /**
   * Constructor for Car class
   */
  constructor (name, model, type){
    this.name = name;
    this.model = model;
    this.type = type;
  }

  /**
   * @return {String} - The full name of the car
   */
  getFullName(){
    return `${this.model} ${this.name} ${this.type}`;
  }
}