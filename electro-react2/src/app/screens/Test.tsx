//@ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeDetail = () => {
    this.setState({ color: "blue", brand: "BMW", model: "X5", year: 2020 });
  };

  componentDidMount() {
    console.log("Component did mount");
    // Bu komponent sahifaga birinchi marta yuklanganda ishlaydi va Backenddan ma'lumot olish yoki DOM elementlariga murojaat qilish uchun ishlatiladi 
  }
  
  componentWillUnmount() {
    console.log("Component will unmount");
    // Bu komponent sahifadan ketishidan oldin ishlaydi
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update");
    // Bu komponent yangilanganidan keyin ishlaydi
    // prevProps va prevState orqali oldingi props va state qiymatlarini olishingiz mumkin
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Colort: {this.state.color}, Model: {this.state.model} from {" "} {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}

export default Test;
