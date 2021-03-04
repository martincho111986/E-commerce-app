import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";
import OrderCard from "../../Shared/OrderCard";

const UserProfile = (props) => {
  
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState()

  useFocusEffect(
    useCallback(
      () => {
        if (
          context.stateUser.isAuthenticated === false ||
          context.stateUser.isAuthenticated === null
        ) {
          props.navigation.navigate("Login");
        }
        AsyncStorage.getItem("jwt")
          .then((res) => {
            axios
              .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((user) => setUserProfile(user.data));
          })
          .catch((err) => console.log("aqui el error", err));

          axios.get(`${baseURL}orders`)
          .then((res) => {
            const data = res.data;
            const userOrders = data.filter(
              (order) => order.user.id === context.stateUser.user.userId
            )
            setOrders(userOrders)
          })
          .catch((error) => console.log(error))
          return () => {
            setUserProfile();
          };
      },
      [context.stateUser.isAuthenticated],
    )
  )



  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
         Bienvenido {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10, fontSize: 20 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10, fontSize: 20 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <EasyButton
            secondary
            large
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch),
            ]}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              LogOut
            </Text>
          </EasyButton>
        </View>
        <View style={styles.order}>
          <Text style={{fontSize: 20 }}>My Orders</Text>

          <View>
            {orders ? (
              orders.map((x) => {
                return (
                  <OrderCard key={x._id} {...x} />
                )
              })
            ): (
              <View style={styles.order}>
                <Text>you have no orders</Text>
              </View>

            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order:{
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 80
  }
});
export default UserProfile;
