import styled from 'styled-components/native';

const BreedView = styled.View`
  flex-direction: row;
  gap: 10px;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.4);
  border-bottom-style: solid;
`;

const BreedImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
`;

const Breed = styled.Text`
  font-size: 17px;
  font-weight: 700;
  margin: auto 0;
`;

interface Props {
  title: string,
  imageUrl: string | null,
}

export const Pet: React.FC<Props> = ({ title, imageUrl }) => {
  return (
    <BreedView>
      <BreedImage
        source={ (imageUrl) ? { uri: imageUrl } : require('../img/placeholder.jpg')}
      />
      <Breed>{title}</Breed>
    </BreedView>
  );
}
