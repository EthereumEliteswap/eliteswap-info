import React, { useMemo } from 'react'
import styled from 'styled-components'
import Panel from '../Panel'
import { AutoColumn } from '../Column'
import { RowFixed } from '../Row'
import { TYPE } from '../../Theme'
import { usePairData } from '../../contexts/PairData'
import { formattedNum } from '../../utils'

const PriceCard = styled(Panel)`
  position: absolute;
  right: -220px;
  width: 220px;
  top: -20px;
  z-index: 9999;
  height: fit-content;
  background-color: ${({ theme }) => theme.bg1};
`

function formatPercent(rawPercent) {
  if (rawPercent < 0.01) {
    return '<1%'
  } else return parseFloat(rawPercent * 100).toFixed(0) + '%'
}

export default function EltPrice() {
  const daiPair = usePairData('0xD67570b97E8F5985ad8D2E0A9ff4fdadA74cB7f2')
  const usdcPair = usePairData('0x280DF65E23e3E3abB254f76245434B3831b4B84B')
  const usdtPair = usePairData('0x05Fd1C17C33d31FEE0c2C33Ab0676A8e2942B5EF')

  const totalLiquidity = useMemo(() => {
    return daiPair && usdcPair && usdtPair
      ? daiPair.trackedReserveUSD + usdcPair.trackedReserveUSD + usdtPair.trackedReserveUSD
      : 0
  }, [daiPair, usdcPair, usdtPair])

  const daiPerEth = daiPair ? parseFloat(daiPair.token0Price).toFixed(2) : '-'
  const usdcPerEth = usdcPair ? parseFloat(usdcPair.token0Price).toFixed(2) : '-'
  const usdtPerEth = usdtPair ? parseFloat(usdtPair.token1Price).toFixed(2) : '-'

  return (
    <PriceCard>
      <AutoColumn gap="10px">
        <RowFixed>
          <TYPE.main>DAI/ETH: {formattedNum(daiPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {daiPair && totalLiquidity ? formatPercent(daiPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
        <RowFixed>
          <TYPE.main>USDC/ETH: {formattedNum(usdcPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {usdcPair && totalLiquidity ? formatPercent(usdcPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
        <RowFixed>
          <TYPE.main>USDT/ETH: {formattedNum(usdtPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {usdtPair && totalLiquidity ? formatPercent(usdtPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
      </AutoColumn>
    </PriceCard>
  )
}
