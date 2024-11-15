import React, { useState, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, Image, View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position off-screen
  const [isBurger, setIsBurger] = useState(true); // Track icon state

  const toggleMenu = () => {
    if (menuVisible) {
      // Close the menu
      Animated.timing(slideAnim, {
        toValue: -300, // Slide out of view
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
      setIsBurger(true);
    } else {
      // Open the menu
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Slide into view
        duration: 300,
        useNativeDriver: true,
      }).start();
      setIsBurger(false);
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              
              {/* Left burger icon */}
              <Pressable style={{ flex: 1, alignItems: 'flex-start' }} onPress={toggleMenu}>
                <FontAwesome name={isBurger ? "bars" : "times"} size={24} color="black" />
              </Pressable>

              {/* Centered Logo */}
              <View style={{ flex: 2, alignItems: 'center' }}>
                <Image
                  source={require('@/assets/images/logo.png')}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </View>

              {/* Right "Book Now" button */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>Book Now</Text>
                </View>
              </TouchableOpacity>
            </View>
          ),
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: { display: 'none' }, // Hide the bottom tab bar
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>

      {/* Animated Menu Overlay */}
      {menuVisible && (
        <Animated.View style={[styles.overlay, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.menuContainer}>
            {/* Menu items */}
            <Text style={styles.menuItem}>Our Story</Text>
            <Text style={styles.menuItem}>Blog</Text>
            <Text style={styles.menuItem}>Contact</Text>
            <Text style={styles.menuItem}>Book Now</Text>
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 120,
    left: 0,
    width: '80%',
    height: '90%',
    backgroundColor: '#f4f0e5', // Light background color for the menu
    zIndex: 1,
  },
  menuContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  menuItem: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
});
