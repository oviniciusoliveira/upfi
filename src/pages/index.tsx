import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { Header } from '../components/Header';
import { Card, CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { GetImagesResponse } from './api/images';

interface GetImagesProps {
  pageParam?: string;
}

async function getImages({
  pageParam,
}: GetImagesProps): Promise<GetImagesResponse> {
  const response: AxiosResponse<GetImagesResponse> = await api.get(`/images`, {
    params: {
      after: pageParam,
    },
  });
  return response.data;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', getImages, {
    getNextPageParam: (lastData: GetImagesResponse) => {
      if (!lastData.after) return null;
      return lastData.after;
    },
  });

  const formattedData: Card[] = useMemo(() => {
    return (
      data?.pages.flatMap(page => {
        return page.data.map(image => ({
          title: image.title,
          description: image.description,
          url: image.url,
          ts: image.ts,
          id: image.id,
        }));
      }) ?? []
    );
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} mt="40px">
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
