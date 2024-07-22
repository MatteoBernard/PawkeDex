import {View, Button, StyleSheet, Image, ImageBackground, Pressable} from "react-native";
import {useRoute, RouteProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../navigation";
import {Template} from "./Template";
import {useEffect, useState} from "react";
import {fetchPokemonByName} from "../api/pokeApi";
import {Pokemon} from "pokenode-ts";
import {getAllFavoritePokemon, isFavoritePokemon, removeFavoritePokemon, storeFavoritePokemon} from "../utils/storage";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {StyledContainer, StatsTab, MovesetTab, SpritesTab} from "../components";
import {Text} from "../styles/StyledText";
import {colors} from "../styles";

export const ShowPokemon = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'ShowPokemon'>>();

    const { name, url, from} = route.params;
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [shiny, setShiny] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const pokedex: { name: string; url: string }[] = useSelector((state: any) => state.pokemons.pokemons);
    const [activeTab, setActiveTab] = useState('Stats');

    const [former, setFormer] = useState<{ name: string; url: string } | null>(null);
    const [next, setNext] = useState<{ name: string; url: string } | null>(null);

    const formattedName = pokemon?.name
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Stats':
                if (pokemon)
                    return <StatsTab pokemon={pokemon} />;
            case 'Moveset':
                if (pokemon)
                    return <MovesetTab pokemon={pokemon} />;
            case 'Sprites':
                if (pokemon)
                    return <SpritesTab pokemon={pokemon} shiny={shiny} />
            default:
                return null;
        }
    };

    useEffect(() => {
        const getFormer = async () => {
            if (from === 'Pokedex') {
                const currentIndex = pokedex.findIndex(p => p.name === name);
                return currentIndex > 0 ? pokedex[currentIndex - 1] : null;
            } else {
                const favorites = await getAllFavoritePokemon();
                const currentIndex = favorites.findIndex(f => f.name === name);
                return currentIndex > 0 ? favorites[currentIndex - 1] : null;
            }
        }

        const getNext = async () => {
            if (from === 'Pokedex') {
                const currentIndex = pokedex.findIndex(p => p.name === name);
                return currentIndex < pokedex.length - 1 ? pokedex[currentIndex + 1] : null;
            } else {
                const favorites = await getAllFavoritePokemon();
                const currentIndex = favorites.findIndex(f => f.name === name);
                return currentIndex < favorites.length - 1 ? favorites[currentIndex + 1] : null;
            }
        }

        const fetchFormerAndNext = async () => {
            const formerPokemon = await getFormer();
            const nextPokemon = await getNext();
            setFormer(formerPokemon);
            setNext(nextPokemon);
        }

        fetchFormerAndNext();
    }, [name, from, pokedex]);

    useEffect(() => {
        console.log(name);
        isFavoritePokemon(name).then((result: boolean) => {
            setIsFavorite(result);
        });
        fetchPokemonByName(name).then((result: Pokemon) => {
            setPokemon(result);
        });
    }, [name]);

    const handleLike = () => {
        if (isFavorite) {
            setIsFavorite(false);
            removeFavoritePokemon(name);
            if (from === 'Favorites') {
                navigation.navigate('Favorites');
            }
        } else {
            setIsFavorite(true);
            storeFavoritePokemon(name, url);
        }
    }

    const handleShiny = () => {
        setShiny(!shiny);
    }

    return (
        <Template title={"Pokemon"}>
            {pokemon && (
                <>
                    <View style={styles.rowContainer}>
                        {
                            from === 'Pokedex' ? (
                                <Pressable onPress={() => {navigation.navigate('Pokedex')}} style={styles.back}>
                                    <Image
                                        source={require('../../assets/images/back.png')}
                                        style={styles.img}
                                    />
                                </Pressable>
                            ) : (
                                <Pressable onPress={() => {navigation.navigate('Favorites')}} style={styles.back}>
                                    <Image
                                        source={require('../../assets/images/back.png')}
                                        style={styles.img}
                                    />
                                </Pressable>
                            )
                        }
                        <StyledContainer>
                            <Image
                                source={require('../../assets/images/pawkedex_logo_crop.png')}
                                style={styles.img}
                            />
                            <Text style={styles.name}>{formattedName}</Text>
                            <Image
                                source={require('../../assets/images/pawkedex_logo_crop.png')}
                                style={styles.img}
                            />
                        </StyledContainer>
                    </View>

                    <ImageBackground
                        source={require('../../assets/images/box_bg.png')}
                        style={styles.pokemonContainer}
                        borderRadius={10}
                    >
                        <Image
                            style={styles.pokemonImage}
                            source={{ uri: (shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default) ?? "" }}
                        />
                    </ImageBackground>

                    <Pressable onPress={() => {handleShiny()}} style={styles.rowContainer}>
                        <StyledContainer>
                            <Image
                                source={require('../../assets/images/star.png')}
                                style={styles.img}
                            />
                            <Text>{shiny ? "Display regular" : "Display shiny"}</Text>
                            <Image
                                source={require('../../assets/images/star.png')}
                                style={styles.img}
                            />
                        </StyledContainer>
                    </Pressable>

                    <View style={styles.tab}>
                        <View style={styles.tabButtons}>
                            <Pressable style={getButtonStyle(activeTab === 'Stats', 'first')} onPress={() => setActiveTab('Stats')}>
                                <Text style={styles.buttonText}>Stats</Text>
                            </Pressable>
                            <Pressable style={getButtonStyle(activeTab === 'Moveset', 'middle')} onPress={() => setActiveTab('Moveset')}>
                                <Text style={styles.buttonText}>Moveset</Text>
                            </Pressable>
                            <Pressable style={getButtonStyle(activeTab === 'Sprites', 'last')} onPress={() => setActiveTab('Sprites')}>
                                <Text style={styles.buttonText}>Sprites</Text>
                            </Pressable>
                        </View>
                        {renderTabContent()}
                    </View>

                    <View style={styles.rowContainer}>
                        {
                            former &&
                            <Pressable onPress={() => {navigation.navigate('ShowPokemon', {name: former?.name, url: former?.url, from: from})}} style={styles.back}>
                                <Image
                                    source={require('../../assets/images/back.png')}
                                    style={styles.img}
                                />
                            </Pressable>
                        }
                        <Pressable onPress={() => {handleLike()}} style={styles.pressableRow}>
                            <StyledContainer>
                                <Text style={styles.name}>{isFavorite ? "Remove like" : "Like"}</Text>
                                <Image
                                    source={require('../../assets/images/pawkedex_logo_crop.png')}
                                    style={styles.img}
                                />
                            </StyledContainer>
                        </Pressable>
                        {
                            next &&
                            <Pressable onPress={() => {navigation.navigate('ShowPokemon', {name: next?.name, url: next?.url, from: from})}} style={styles.back}>
                                <Image
                                    source={require('../../assets/images/next.png')}
                                    style={styles.img}
                                />
                            </Pressable>
                        }
                    </View>
                </>
            )}
        </Template>
    )
}

const getButtonStyle = (isActive: boolean, position: 'first' | 'middle' | 'last') => ({
    flex: 1,
    backgroundColor: colors.light,
    padding: 5,
    marginBottom: 8,
    borderTopRightRadius: position === 'last' ? 10 : 0,
    borderTopLeftRadius: position === 'first' ? 10 : 0,
    borderLeftWidth: position === 'first' || isActive ? 0 : 1.5,
    borderRightWidth: position === 'last' || isActive ? 0 : 1.5,
    borderBottomWidth: isActive ? 0 : 3,
});

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        margin: 10,
        gap: 10,
        alignSelf: 'center',
    },
    pressableRow: {
        flex: 1,
    },
    back: {
        padding: 5,
        borderWidth: 3,
        borderRadius: 10,
    },
    name: {
        marginHorizontal: 10,
    },
    img: {
        height: 20,
        width: 20,
    },
    pokemonContainer: {
        alignItems: 'center',
        padding: 10,
        borderWidth: 3,
        borderColor: colors.dark,
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
    },
    pokemonImage: {
        width: 150,
        height: 150,
    },
    buttonText: {
        color: colors.dark,
        backgroundColor: colors.light,
        textAlign: 'center',
        fontSize: 10,
    },
    tab: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 3,
        margin: 10,
    },
    tabButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.light,
        color: colors.light,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomWidth: 3,
    },
});
