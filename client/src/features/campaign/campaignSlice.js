import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const getCampaign = createAsyncThunk(
  'campaign/getCampaign',
  async (id, { rejectWithValue }) => {
    const response = await client.get(`/api/campaigns/${id}`)
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

export const getCurrentCampaigns = createAsyncThunk(
  'campaign/getCurrentCampaigns',
  async (_, { rejectWithValue }) => {
    const response = await client.get('/api/campaigns/current')
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

export const createCampaign = createAsyncThunk(
  'campaign/createCampaign',
  async (campaign, { rejectWithValue }) => {
    const response = await client.post(`/api/campaigns/`, { campaign })
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

export const updateCampaign = createAsyncThunk(
  'campaign/updateCampaign',
  async (campaign, { rejectWithValue }) => {
    const response = await client.patch(
      `/api/campaigns/${campaign.id}`,
      campaign
    )
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

export const deleteCampaign = createAsyncThunk(
  'campaign/deleteCampaign',
  async (id, { rejectWithValue }) => {
    const response = await client.delete(`/api/campaigns/${id}`)
    if (!response.ok) {
      const body = await response.json()
      return rejectWithValue(body)
    }
  }
)

const initialState = {
  campaign: null,
  campaigns: [],
  status: 'idle',
  errors: [],
}

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    reset: () => initialState,
    resetErrors: (state) => {
      state.status = 'idle'
      state.errors = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentCampaigns.pending, (state) => {
        state.status = 'loading'
        state.errors = []
      })
      .addCase(getCurrentCampaigns.fulfilled, (state, action) => {
        state.status = 'idle'
        state.campaigns = action.payload
      })
      .addCase(getCurrentCampaigns.rejected, (state, action) => {
        state.status = 'loading'
        state.errors = action.payload.errors
      })
      .addCase(getCampaign.pending, (state) => {
        state.status = 'loading'
        state.campaign = null
        state.errors = []
      })
      .addCase(getCampaign.fulfilled, (state, action) => {
        state.status = 'idle'
        state.campaign = action.payload
      })
      .addCase(getCampaign.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
      .addCase(createCampaign.pending, (state) => {
        state.status = 'loading'
        state.errors = []
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.campaign = action.payload
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
      .addCase(updateCampaign.pending, (state) => {
        state.status = 'loading'
        state.errors = []
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.campaign = action.payload
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
      .addCase(deleteCampaign.pending, (state) => {
        state.status = 'loading'
        state.errors = []
      })
      .addCase(deleteCampaign.fulfilled, (state) => {
        state.status = 'succeeded'
        state.errors = []
        state.campaign.id = 0
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = ['Something went wrong, try again later']
      })
  },
})

export default campaignSlice.reducer
export const { resetErrors, reset } = campaignSlice.actions
