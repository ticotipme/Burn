import React, { useEffect } from "react";
import { styled } from "@linaria/react";
import { AssetIcon, Button, Input, Window } from "@app/shared/components";
import { amountHandler, keyPressAmountHandler } from "@app/utils/amountHandler";
import Container from "@app/shared/components/Container";
import {SendIcon} from "@app/assets/icons";
import {useDispatch, useSelector} from "react-redux";
import * as mainActions from '@app/containers/Main/store/actions';
import {fromGroths, toGroths} from "@core/appUtils";
import {selectFound} from "@app/containers/Main/store/selectors";
import {ASSET_ID} from "@app/shared/config";



const Flex = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 300px;
  width: 100%;
`;

const Text = styled.span`
  margin-left: 10px;
  margin-top: 1px;
`;

const FoundContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;
const FoundAmount = styled.span`
font-size: 32px;
  padding-right: 10px;
`
const FoundText = styled.span`
font-size: 32px;
  padding-left: 20px;
`

const MainPage: React.FC = () => {
  const initialValues = {
    amount: "",
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
  };

  return (
    <Window title="BURN">
      <Container variant="center">
        <FoundContainer>
          <FoundAmount>
            Found: {fromGroths(found)}
          </FoundAmount>
          <AssetIcon asset_id={ASSET_ID} big/> <FoundText>TICO</FoundText>
        </FoundContainer>
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
          >
            <SendIcon/>
            <Text
                sx={{fontWeight: "bold", color: "#032E49", marginLeft: "9px"}}
            >
              Burn
            </Text>
          </Button>
        </ButtonContainer>
      </Container>
    </Window>
  );
};

export default MainPage;
