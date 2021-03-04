import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLigth";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";

const codes = [
  { name: "pending", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status === "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("pending");
      setCardColor("#e74c3c");
    } else if (props.status === "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("shipped");
      setCardColor("#f1c40f");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("delivered");
      setCardColor("#2ecc71");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props._id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };
    axios
      .put(`${baseURL}orders/${props._id}`, order, config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: `Orden Editada`,
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: `hubo un error en la orden`,
          text2: "por favor, intenta de nuevo",
        });
      });
  };

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.insideCard}>
      <View style={styles.container}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Order Number: {props._id}</Text>
      </View>
      <View style={{ marginTop: 10, padding: 10 }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          Status: {statusText} {orderStatus}
        </Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          Address: {props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>City: {props.city}</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Country: {props.country}</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Date Order: {props.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price1}>Price: </Text>
          <Text style={styles.price}>$ {props.totalPrice}</Text>
        </View>
        {props.editMode ? (
          <View>
            <Picker
              mode="dropdown"
              iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={statusChange}
              placeholder="Change Status"
              placeholderIconColor={{ color: "#007aff" }}
              onValueChange={(e) => setStatusChange(e)}
            >
              {codes.map((c) => {
                return (
                  <Picker.Item key={c.code} label={c.name} value={c.code} />
                );
              })}
            </Picker>
            <EasyButton secondary large onPress={() => updateOrder()}>
              <Text style={{ color: "white", fontSize: 20 }}>Update</Text>
            </EasyButton>
          </View>
        ) : null}
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  insideCard:{
    backgroundColor: 'white'
  },
  title: {
    backgroundColor: "#62b1f6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 21
  },
  price1: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 21
  },
});

export default OrderCard;
