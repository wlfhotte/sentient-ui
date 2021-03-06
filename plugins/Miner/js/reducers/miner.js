import { Map } from 'immutable'
import * as constants from '../constants/miner.js'
import * as errors from '../constants/error.js'
import { start } from 'repl';

const initialState = Map({
  walletunlocked: true,
  confirmedbalance: '0',
  miningtype: 'pool',
  intensity: 0,
  hashrate: '0',
  poolhashrate: '0',
  mining: false,
  miningpid: null,
  hashratehistory: [],
  currenthashrate: [],
  poolhistory: [],
  sharesefficiency: {},
  balance: {},
  charttype: 'hashrate',
})

export default function minerReducer(state = initialState, action) {
  switch (action.type) {
  case constants.SET_WALLET_BALANCE:
    return state
      .set('walletunlocked', action.walletUnlocked)
      .set('confirmedbalance', action.confirmedBalance)
  case constants.SET_MINING_STATUS:
    return state
      .set('mining', action.miningStatus)
      .set('miningpid', action.miningPid)
      .set('hashrate', '0')
  case constants.START_MINER:
    return state.set('currenthashrate', [])
  case constants.SET_MINING_TYPE:
    return state.set('miningtype', action.miningType)
  case constants.SET_INTENSITY:
    return state.set('intensity', action.intensity)
  case constants.UPDATE_HASH_RATE:
    return state.set('hashrate', action.hashRate * 1000000)
  case constants.UPDATE_POOL_HASH_RATE:
    return state.set('poolhashrate', action.hashRate)
  case constants.UPDATE_CURRENT_HASH_RATE:
    return state.set('currenthashrate', [...state.get('currenthashrate'), { time: action.timestamp, hashrate: action.hashRate * 1000000 }])
  case constants.SET_POOL_STATS_HISTORY:
    return state.set('poolhistory', action.poolHistory)
  case constants.SET_HASHRATE_HISTORY:
    return state.set('hashratehistory', action.hashrateHistory)
  case constants.UPDATE_SHARES_EFFICIENCY:
    return state.set('sharesefficiency', action.sharesEfficiency)
  case constants.UPDATE_UNPAID_BALANCE:
    return state.set('balance', action.balance)
  case constants.CHANGE_CHART_TYPE:
    return state.set('charttype', action.chartType)
  default:
    return state
  }
}
