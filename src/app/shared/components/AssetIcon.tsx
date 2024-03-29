import React from 'react';

import { BeamIcon as BeamIconSvg, AssetIcon as AssetIconSvg } from '@app/shared/icons';

import { styled } from '@linaria/react';
import { PALLETE_ASSETS } from '@app/shared/constants';
import {AssetIconBig} from "@app/assets/icons";

export interface AssetIconProps {
  asset_id?: number;
  className?: string;
  big?: boolean
}

const ContainerStyled = styled.div<AssetIconProps>`
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  color: ${({ asset_id }) =>
    PALLETE_ASSETS[asset_id] ? PALLETE_ASSETS[asset_id] : PALLETE_ASSETS[asset_id % PALLETE_ASSETS.length]};
`;

const AssetIcon: React.FC<AssetIconProps> = ({ asset_id = 0, className, big = false }) => {
  const IconComponent = big ? AssetIconBig : AssetIconSvg;
  return (
    <ContainerStyled asset_id={asset_id} className={className}>
      <IconComponent />
    </ContainerStyled>
  );
};

export default AssetIcon;
