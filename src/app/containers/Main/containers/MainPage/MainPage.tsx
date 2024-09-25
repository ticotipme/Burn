import React, { useEffect } from "react";
import { styled } from "@linaria/react";
import { AssetIcon, Button, Input, Window, ProgressBar } from "@app/shared/components";
import { amountHandler, keyPressAmountHandler } from "@app/utils/amountHandler";
import Container from "@app/shared/components/Container";
import {DappIcon1, SendIcon} from "@app/assets/icons";
import {useDispatch, useSelector} from "react-redux";
import * as mainActions from '@app/containers/Main/store/actions';
import {fromGroths, toGroths} from "@core/appUtils";
import {selectFound} from "@app/containers/Main/store/selectors";
import {ASSET_ID} from "@app/shared/config";
import {SocialLinks} from "@app/shared/components/SocialLinks";
import { TICO_SUPPLY } from "@app/shared/constants";


const Flex = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 200px;
  width: 100%;
`;

const Text = styled.span`
  font-family: 'ProximaNova', 'SFProDisplay', sans-serif;
  margin-left: 10px;
  margin-top: 1px;
`;

const FoundContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;
const FoundAmount = styled.span`
  font-family: 'ProximaNova', 'SFProDisplay', sans-serif;
  font-size: 32px;
  padding-right: 10px;
`;
const FoundText = styled.span`
  font-size: 32px;
  padding-left: 20px;
`;
const PercentSupplyContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;  
`;
const PercentSupplyText = styled.span`
  font-family: 'ProximaNova', 'SFProDisplay', sans-serif;
  font-size: 15px;
  padding-left: 20px;
  font-style: italic;
  color: grey;
`;
const SupplyBurnedProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;



const MainPage: React.FC = () => {
  const initialValues = {
    amount: "", // input field 
  };

  const [values, setValues] = React.useState(initialValues);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [textWidth, setTextWidth] = React.useState(0);
 
  useEffect(() => {
    if (Number(values.amount) > 0) {
      setIsButtonDisabled(false);
    } else setIsButtonDisabled(true);
  }, [values.amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value  } = e.target;

    amountHandler(value, (value) =>
      setValues({
        ...values,
        [name]: value,
      })
    );

    return;
  };

  const dispatch = useDispatch()
  const found = useSelector(selectFound());


  const toBurn = ( amount: string) => {
    dispatch(mainActions.toBurn.request(toGroths(Number(amount)).toString()));
        setValues({
          ...values,
          [amount]: 0
        })

  };


    const str_burned = (fromGroths(found) / TICO_SUPPLY * 100).toFixed(2).toString();
    const int_burned = (fromGroths(found) / TICO_SUPPLY * 100)

  return (
    <Window title="TICO BURN">
      <Container variant="center">

        <FoundContainer>
          <FoundAmount>
            {fromGroths(found).toLocaleString()}<FoundText>TICO have been burned</FoundText>
          </FoundAmount>
        </FoundContainer> 
        
       <PercentSupplyContainer>
        <PercentSupplyText>
          Equal to {str_burned}% of the TICO supply
        </PercentSupplyText>
      </PercentSupplyContainer>

      <SupplyBurnedProgressBarContainer>
        <ProgressBar 
          active={true} 
          percent={int_burned}> 
        </ProgressBar>
      </SupplyBurnedProgressBarContainer>

        <Input
            variant="modalInput"
            pallete="purple"
            // label="Amount"
            name="amount"
            onChange={handleChange}
            onKeyPress={keyPressAmountHandler}
            value={values.amount}
            type="text"
        >
          <Flex>
            <AssetIcon asset_id={ASSET_ID}/> <Text>TICO</Text>
          </Flex>
        </Input>
        <ButtonContainer>
          <Button
              onClick={() => toBurn(values.amount)}
              disabled={isButtonDisabled}
              pallete="purple"
          >
            <SendIcon/>
            <Text sx={{fontWeight: "bold", color: "#032E49", marginLeft: "9px"}}>
              Burn
            </Text>
          </Button>
        </ButtonContainer>
      </Container>
    </Window>
  );
};

export default MainPage;
