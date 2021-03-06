import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const getCampaigns = createAsyncThunk(
  'campaign/getCampaigns',
  async (_, { rejectWithValue }) => {
    const response = await client.get('/api/campaigns')
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

const initialState = {
  campaigns: null,
  status: 'idle',
  errors: null,
}

const campaignSearchSlice = createSlice({
  name: 'campaignSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaigns.pending, (state) => {
        state.status = 'loading'
        state.errors = null
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.campaigns = action.payload
        state.errors = null
      })
      .addCase(getCampaigns.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
  },
})

export default campaignSearchSlice.reducer
