import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Cat } from '../types/Cat';
import { getCats } from '../api/cats';
import { Link } from '../components/Link';
import { Mark } from '../components/Mark';

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  alignItems: center;
`;

const TextLoader = styled.Text`
  margin-top: 10px;
`;

const CatImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`;

const Container = styled.ScrollView`
  padding: 20px;
`;

const Details = styled.View`
  padding: 20px 0;
`;

const Detail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ddd;
  border-radius: 5px;
`;

const P = styled.Text`
  color: rgba(0, 0, 0, 0.6);
`;

interface Props {
  route: {
    params: {
      id: string;
      name: string;
      weight: {
        imperial: string,
        metric: string,
      };
      wikipedia_url: string;
      temperament: string;
      hypoallergenic: number;
      dog_friendly: number;
      energy_level: number;
      hairless: number,
      health_issues: number;
    }
  }
  navigation: {
    setOptions: (obj: { title: string }) => void;
  }
};

export const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const [cat, setCat] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    name,
    weight,
    wikipedia_url,
    temperament,
    hypoallergenic,
    dog_friendly,
    energy_level,
    hairless,
    health_issues,
  } = route.params;

  const loadCat = async () => {
    try {
      setIsLoading(true);
      const cat: Cat[] = await getCats(route.params.id);
      setCat(cat);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Can not get cat')
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
    loadCat();
  }, []);

  if (isLoading) {
    return <Loader>
      <ActivityIndicator size="large" />
      <TextLoader>Loading...</TextLoader>
    </Loader>
  }

  return (
    <Container
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadCat} />}
    >
      <CatImage
        source={ (cat[0]) ? { uri: cat[0].url } : require('../img/placeholder.jpg')}
      />

      <Details>
        <Detail>
          <Text>Imperial:</Text>
          <P>{weight.imperial}</P>
        </Detail>

        <Detail>
          <Text>Metric:</Text>
          <P>{weight.metric}</P>
        </Detail>

        <Detail>
          <Text>Hypoallergenic:</Text>
          <Mark mark={hypoallergenic} />
        </Detail>

        <Detail>
          <Text>Dog friendly:</Text>
          <Mark mark={dog_friendly} />
        </Detail>

        <Detail>
          <Text>Energy leverl:</Text>
          <Mark mark={energy_level} />
        </Detail>

        <Detail>
          <Text>Hairless:</Text>
          <Mark mark={hairless} />
        </Detail>

        <Detail>
          <Text>Health issuesy:</Text>
          <Mark mark={health_issues} />
        </Detail>

        <Detail>
          <Text>Temperament:</Text>
          <View>
            {temperament.split(', ').map((t => (
              <P key={t}>{t}</P>
            )))}
          </View>
        </Detail>


        <Link url={wikipedia_url}>Wiki</Link>
      </Details>
    </Container>
  );
}
