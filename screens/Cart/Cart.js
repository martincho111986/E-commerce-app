import React, { useContext } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from 'react-native-swipe-list-view';
import CartItem from '../Cart/CartItem';
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import AuthGlobal from "../../Context/store/AuthGlobal";


const { height, width } = Dimensions.get("window");

const Cart = (props) => {
  console.log(props)

  const context = useContext(AuthGlobal);

  let total = 0;
  props.cartItems.forEach(cart => {
      return (total += cart.product.price)
  })
  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
            <SwipeListView 
                data={props.cartItems}
                renderItem={(data) => <CartItem item={data} />}
                renderHiddenItem={(data) => (
                    <View style={styles.hiddenContainer}>
                        <TouchableOpacity
                            style={styles.hiddenButton}
                            onPress={() => props.removeFromCart(data.item)}
                        >
                            <Icon name="trash" color={"white"} size={30} />
                        </TouchableOpacity>
                    </View>
                )}
                disableRightSwipe={true}
                previewOpenDelay={3000}
                friction={1000}
                tension={40}
                leftOpenValue={75}
                stopLeftSwipe={75}
                rightOpenValue={-75}
            />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>$ {total}</Text>
            </Left>
            <Right>
              <EasyButton
              danger
              medium
              onPress={() => props.clearCart()}
              >
                <Text style={styles.textStyle}>Clear</Text>
              </EasyButton>
            </Right>
            <Right style={{marginRight: 5}}>
              {context.stateUser.isAuthenticated ? (
                <EasyButton
              secondary
              medium
                onPress={() => props.navigation.navigate("Checkout")}
              >
                <Text style={styles.textStyle}>Checkout</Text>
              </EasyButton>
              ) : (
                <EasyButton
              secondary
              medium
                onPress={() => props.navigation.navigate("Login")}
              >
                <Text style={styles.textStyle}>Login</Text>
              </EasyButton>
              )}
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products tu your cart to get started</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: 'white',
      elevation: 20,
  },
  price: {
      fontSize: 18,
      margin: 20,
      color: 'red',
      fontSize: 30
  },
  hiddenContainer:{
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'row'
  },
  hiddenButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 25,
      height: 70,
      width: width / 1.2
  },
  textStyle:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
