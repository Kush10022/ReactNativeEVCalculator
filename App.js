import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useState } from 'react';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

export default function App() {

  const [pricePerLitre, setPricePerLitre] = useState('');
  const [gasMileage, setGasMileage] = useState('');
  const [utilitiesCost, setUtilitiesCost] = useState('');
  const [evMileage, setEvMileage] = useState('');
  const [kmDrivenPerYear, setKmDrivenPerYear] = useState(0); // Default to first option

  const [distanceElectricCar, setDistanceElectricCar] = useState('NaN');
  const [additionalDistance, setAdditionalDistance] = useState('NaN');
  const [annualSavings, setAnnualSavings] = useState('NaN');


  const calculateSavings = () => {
    const price = parseFloat(pricePerLitre);
    const gas = parseFloat(gasMileage);
    const utilities = parseFloat(utilitiesCost);
    const ev = parseFloat(evMileage);
    const kmYear = parseInt(kmDrivenPerYear, 10);

    const gasCarDistance = gas; 
    const electricCarDistance = ev * (price / utilities);
    const extraDistance = electricCarDistance - gasCarDistance;

    const gasCostAnnual = price * (kmYear / gas);
    const electricCostAnnual = utilities * (kmYear / ev);
    const savings = gasCostAnnual - electricCostAnnual;

    setDistanceElectricCar(electricCarDistance.toFixed(1));
    setAdditionalDistance(extraDistance.toFixed(1));
    setAnnualSavings(savings.toFixed(0));
  };

  return (
    <SafeAreaView style={{ flex: 10 }}>
      <View style={{ flex: 10 }}>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.heading}>
            EV Saving calculator
          </Text>
          <Text style={styles.text}>
            Gas vehicle information
          </Text>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.box}
            placeholder="Price per litre ($/L)"
            value={pricePerLitre}
            onChangeText={setPricePerLitre}
            fontSize={16}
          />
          <TextInput
            style={styles.box}
            placeholder="Gas mileage (km/L)"
            value={gasMileage}
            onChangeText={setGasMileage}
            fontSize={16}
          />
        </View>
        <View>
          <Text style={styles.text}>
            Electric vehicle information
          </Text>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.box}
            placeholder="Utilities cost ($/kWh)"
            value={utilitiesCost}
            onChangeText={setUtilitiesCost}
            fontSize={16}
          />
          <TextInput
            style={styles.box}
            placeholder="EV mileage (km/kWh)"
            value={evMileage}
            onChangeText={setEvMileage}
            fontSize={16}
          />
        </View>
        <View style={{ flex: 0.4 }}>
          <Text style={styles.text}>
            How many km do you drive each year?
          </Text>
        </View>
        <View style={{ flex: 0.7 }}>
          <SegmentedControl
            style={{ left: 15, width: 350 }}
            values={["15000", "25000", "40000"]}
            selectedIndex={kmDrivenPerYear}
            onChange={(event) => {
              setKmDrivenPerYear(event.nativeEvent.value)
            }}
            onValueChange={setKmDrivenPerYear}
          />
        </View>
        <View style={{ flex: 1.2 }}>
          <Pressable onPress={calculateSavings}>
            <Text style={styles.estimate}>
              Estimate savings
            </Text>
          </Pressable>
        </View>
        <View style={{ flex: 0.4 }}>
          <Text style={styles.text1}>
            For the price of 1 litre of gas, you can travel:
          </Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
          <View style={[styles.box2, styles.color]}>
            <FontAwesome5 name="gas-pump" size={24} color="black" />
            <Text style={styles.text3}>{gasMileage}</Text>
            <Text style={styles.kmText}>km</Text>
          </View>

          <View style={[styles.box2, styles.color2]}>
            <FontAwesome5 name="plug" size={24} color="black" />
            <Text style={styles.text3}>{distanceElectricCar}</Text>
            <Text style={styles.kmText}>km</Text>
          </View>

          <View style={[styles.box2, styles.color3]}>
            <FontAwesome name="arrow-circle-right" size={24} color="black" />
            <Text style={styles.text3}>{additionalDistance}</Text>
            <Text style={styles.kmText}>km more</Text>
          </View>
        </View>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.text4}>
            By switching to electric, you obtain:
          </Text>
        </View>

        <View style={{ flex: 2, flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
          <View style={[styles.box3, styles.black]}>
            <FontAwesome5 size={24}/>
            <Text style={styles.text5}>${annualSavings} in savings per year</Text>
            {/* <Text style={styles.text6}>in savings per year</Text> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 50,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    left: 15
  },
  text: {
    left: 15,
    fontSize: 17
  },
  text1: {
    left: 15,
    fontSize: 17
  },
  box: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 6,
    fontSize: 18,
    borderRadius: 6,
    margin: 10,
    width: 175,
    left: 6,
    backgroundColor: "lightgrey"
  },
  estimate: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 6,
    fontSize: 27,
    fontWeight: 'bold',
    borderRadius: 6,
    margin: 10,
    width: 320,
    left: 30,
    backgroundColor: "#ff80c5",
    textAlign: "center"
  },
  box2: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  color: {
    backgroundColor: '#8aff9c',
  },
  kmText: {
    fontSize: 16,
    color: 'black',
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  text3: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  color2: {
    backgroundColor: '#ff9e9e',
  },
  color3: {
    backgroundColor: '#91aaff',
  },
  text4: {
    fontSize: 17,
    textAlign: 'center'
  },
  box3: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 6,
    fontSize: 18,
    borderRadius: 6,
    margin: 10,
    width: 320,
    left: 6,
    backgroundColor: "lightgrey"
  },
  black: {
    backgroundColor: '#c4fff7',
  },
  text5: {
    fontSize: 35,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    bottom: 10
  },
  text6: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    bottom: 10
  }
});
