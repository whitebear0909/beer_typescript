import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../services/axios';
import { Md5 } from 'ts-md5';

export interface Amount {
  value: number,
  unit: string
}

export interface Hop {
  name: string,
  add: string,
  amount: Amount,
  attribute: string
}

export interface Malt {
  name: string,
  amount: Amount
}

export interface Ingredients {
  hops: Hop[],
  malt: Malt[],
  yeast: string
}

export interface Fermentation {
  temp: Amount
}

export interface MashTemp {
  temp: Amount,
  duration: number
}

export interface Method {
  fermentation: Fermentation,
  mash_temp: MashTemp[],
  twist: string
}

export interface Beer {
  abv: number,
  attenuation_level: number,
  boil_volume: Amount,
  brewers_tips: string,
  contributed_by: string,
  description: string,
  ebc: number,
  first_brewed: string,
  food_pairing: string[],
  ibu: number,
  id: number,
  image_url: string,
  ingredients: Ingredients,
  method: Method,
  name: string,
  ph: number,
  srm: number,
  tagline: string,
  target_fg: number,
  target_og: number,
  volume: Amount,
}

export interface BeerState {
  beers: Beer[];
  loading: boolean;
  randomBeer: Beer | any;
  error: any;
  favoriteBeers: any;
  favoriteIds: number[];
  byHash: any;
}

const initialState: BeerState = {
  beers: [],
  loading: false,
  error: '',
  randomBeer: null,
  favoriteBeers: [],
  favoriteIds: [],
  byHash: {},
};

export const fetchBeers = createAsyncThunk(
  'beers/fetchData',
  async (searchstr: string) => {
    const response = await axios.get(`/v2/beers?${searchstr ? 'beer_name=' + searchstr : ''}`);
    return response.data;
  }
);

export const fetchRandomBeer = createAsyncThunk(
  'beers/fetchRandomBeer',
  async () => {
    const response = await axios.get(`/v2/beers/random`);
    return response.data;
  }
);

export const fetchBeersByFavoriteIds = createAsyncThunk(
  'beers/fetchBeersByFavoriteIds',
  async (ids: number[]) => {
    const response = await axios.get(`/v2/beers?ids=${ids.join("|")}`);
    return response.data;
  }
);

export const BeerSlice = createSlice({
  name: 'beer',
  initialState,
  reducers: {
    addFavorite: (state: BeerState, action: PayloadAction<any>) => {
      const hashData = Md5.hashStr(JSON.stringify(action.payload)).toString();
      state.byHash = {
        ...state.byHash,
        [action.payload.id]: hashData
      };
      state.favoriteIds.push(action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBeers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBeers.fulfilled, (state, { payload }) => {
      state.beers = payload;
      state.loading = false;
    });
    builder.addCase(fetchBeers.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload;
        state.loading = false;
      }
    });

    builder.addCase(fetchRandomBeer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRandomBeer.fulfilled, (state, { payload }) => {
      state.randomBeer = payload;
      state.loading = false;
    });
    builder.addCase(fetchRandomBeer.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload;
        state.loading = false;
      }
    });

    builder.addCase(fetchBeersByFavoriteIds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBeersByFavoriteIds.fulfilled, (state, { payload }) => {
      payload.map((item: any, index: number, array: any) => {
        if (state.byHash[item.id] === Md5.hashStr(JSON.stringify(item)).toString())
          item["changed"] = false;
        else item["changed"] = true;
        return array;
      });

      state.favoriteBeers = payload;
      state.loading = false;
    });
    builder.addCase(fetchBeersByFavoriteIds.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload;
        state.loading = false;
      }
    });
  }
});

export const {
  addFavorite,
} = BeerSlice.actions;

export default BeerSlice.reducer;
