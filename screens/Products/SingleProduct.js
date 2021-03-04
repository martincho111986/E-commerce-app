import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { Left, Right, Container, H1 } from "native-base";
import Toast from "react-native-toast-message";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLigth";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";


const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState('')

  useEffect(() => {
    if(props.route.params.item.countInStock === 0){
      setAvailability(<TrafficLight unavailable></TrafficLight>)
      setAvailabilityText("Unavailable")
    } else if(props.route.params.item.countInStock <= 5){
      setAvailability(<TrafficLight limited></TrafficLight>)
      setAvailabilityText("Limited Stock")
    } else {
      setAvailability(<TrafficLight available></TrafficLight>)
      setAvailabilityText("Available")
    }
    return () => {
      setAvailability(null)
      setAvailabilityText("")
    }
  }, [])

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{marginRight: 10, fontSize: 20, fontWeight: 'bold'}}>
            Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text style={{margin: 10, fontSize: 30}}>{item.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>$ {item.price}</Text>
        </Left>
        <Right>
          <EasyButton
            medium
            primary
            onPress={() => {
              props.addItemToCart(item),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${item.name} added to Cart`,
                  text2: "Go to your Cart to complete order",
                });
            }}
          >
            <Text style={{color: 'white'}}>Add</Text>
          </EasyButton>
        </Right>
      </View>
    </Container>
  );
};

const mapToDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    // marginHorizontal: '2.5%'
  },
  price: {
    fontSize: 27,
    margin: 20,
    color: "blue",
    fontWeight: 'bold',
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 10
  }
});
export default connect(null, mapToDispatchToProps)(SingleProduct);
