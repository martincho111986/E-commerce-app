import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";
import EasyButton from "../../../Shared/StyledComponents/EasyButton";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  const finalOrder = props.route.params;

  const confirmOrder = () => {
    const order = finalOrder.order.order;
    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: `se completo la orden`,
            text2: "",
          })
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
          }, 500)
        }
      })
      .catch((error) => {
        console.log(error)
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: `hubo un error en la orden`,
          text2: "por favor, intenta de nuevo",
        })
      })
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            <Text style={styles.title}>Shipping To:</Text>
            <View style={{ padding: 8 }}>
              <Text>Adress: {finalOrder.order.order.shippingAdress1}</Text>
              <Text>Adress2: {finalOrder.order.order.shippingAdress2}</Text>
              <Text>city: {finalOrder.order.order.city}</Text>
              <Text>ZipCode: {finalOrder.order.order.zip}</Text>
              <Text>Country: {finalOrder.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items: </Text>
            {finalOrder.order.order.orderItems.map((item) => {
              return (
                <ListItem
                  style={styles.listItem}
                  key={item.product.name}
                  avatar
                >
                  <Left>
                    <Thumbnail source={{ uri: item.product.image }} />
                  </Left>
                  <Body style={styles.body}>
                    <Left>
                      <Text>{item.product.name}</Text>
                    </Left>
                    <Right>
                      <Text>$ {item.product.price}</Text>
                    </Right>
                  </Body>
                </ListItem>
              );
            })}
          </View>
        ) : null}
        {finalOrder ? (
          <View style={{ alignItems: "center", margin: 20 }}>
          <EasyButton secondary large onPress={confirmOrder}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Place Order
            </Text>
          </EasyButton>
        </View>
        ) : (
          <View>
            <Text>No Tienes ninguna orden generada</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
export default connect(null, mapDispatchToProps)(Confirm);
