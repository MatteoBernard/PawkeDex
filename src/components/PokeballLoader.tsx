import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Image } from 'react-native';

const PokeballLoader = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ).start();
    }, []);

    const spinZ = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '359deg'] // Changed to 359deg to avoid a jump at the end of the rotation
    });

    return (
        <Animated.View style={[{ transform: [{rotateZ: spinZ}] }, styles.container]}>
            <Image
                source={require('../../assets/images/pawkedex_logo_crop.png')}
                style={styles.image}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default PokeballLoader;