import {
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Pet } from '../components/Pet';
import { useEffect, useState } from 'react';
import { getBreeds } from '../api/cats';
import { Breed } from '../types/Breed';
import styled from 'styled-components/native';

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  alignItems: center;
`;

const TextLoader = styled.Text`
  margin-top: 10px;
`;

interface Props {
  navigation: {
    navigate: (str: string, something?: any) => void;
  }
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [cats, setCats] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCats = async () => {
    try {
      setIsLoading(true);
      const cats: Breed[] = await getBreeds();
      setCats(cats);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Can not get cats')
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCats();
  }, []);

  if (isLoading) {
    return <Loader>
      <ActivityIndicator size="large" />
      <TextLoader>Loading...</TextLoader>
    </Loader>
  }

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadCats} />}
      data={cats}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(
            'Breed', 
            {
              id: item.id,
              name: item.name,
              weight: item.weight,
              wikipedia_url: item.wikipedia_url,
              temperament: item.temperament,
              hypoallergenic: item.hypoallergenic,
              dog_friendly: item.dog_friendly,
              energy_level: item.energy_level,
              hairless: item.hairless,
              health_issues: item.health_issues,
            }
          )}
        >
          <Pet title={item.name} imageUrl={ (item.image) ? item.image.url : null } />
        </TouchableOpacity>
      )}
    />
  );
}
