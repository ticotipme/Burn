import React, { FC } from 'react';
import {DiscordIcon, TelegramIcon, WebIcon} from "@app/assets/icons";
import {styled} from "@linaria/react";
import {Button} from "@app/shared/components/index";

 const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  user-select: none;
`

 const TabsChildren = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`

const Link = styled.a`
margin: 0 5px;
`

export const SocialLinks: FC = () => {



    return (
        <>
            <TabsContainer>
                <TabsChildren>
                    <Link href='https://t.me/ticotipme' target='_blank'><TelegramIcon/></Link>
                    <Link href='https://discord.com/invite/QMAGK4mxgK' target='_blank'><DiscordIcon/></Link>
                    <Link href='https://ticotip.me' target='_blank'><WebIcon/></Link>
                </TabsChildren>
            </TabsContainer>
        </>
    )
}