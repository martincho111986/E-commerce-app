import React, { useState } from "react";
import { View, Button } from "react-native";
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
  Picker,
  Icon,
  Body,
  Title,
} from "native-base";
import EasyButton from "../../../Shared/StyledComponents/EasyButton";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <Container>
      <Header>
        <Body>
          <Title style={{ alignSelf: "center" }}>
            Choose your payment method
          </Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item, index) => {
          return (
            <ListItem onPress={() => setSelected(item.value)} key={item.name}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected === item.value} />
              </Right>
            </ListItem>
          );
        })}

        {selected === 3 ? (
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            headerStyle={{ backgroundColor: "orange" }}
            headerBackButtonTextStyle={{ color: "#FFF" }}
            headerTitleStyle={{ color: "#FFF" }}
            selectedValue={card}
            onValueChange={(x) => setCard(x)}
          >
            {paymentCards.map((c, index) => {
              return <Picker.Item key={c.name} label={c.name} value={c.name} />;
            })}
          </Picker>
        ) : null}

        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <EasyButton
            secondary
            large
            onPress={() => props.navigation.navigate("Confirm", { order })}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Confirm
            </Text>
          </EasyButton>
        </View>
      </Content>
    </Container>
  );
};

export default Payment;
