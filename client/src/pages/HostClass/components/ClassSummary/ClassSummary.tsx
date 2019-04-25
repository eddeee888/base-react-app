import React from 'react';
import Block from 'src/common/components/Block';
import Divider from 'src/common/components/Divider';
import Paper from 'src/common/components/Paper';
import Text from 'src/common/components/Text';
import { validationSchemas } from '../../constants';
import { NavFunctions } from '../../handlers/createNavFunctions';
import { HostClassState } from '../../types';
import ClassCategoriesQuery from '../ClassCategoriesQuery';
import Navigation from '../Navigation';
import ContactSection from './ContactSection';
import DetailsSection from './DetailsSection';
import SessionsSection from './SessionsSection';

export interface ClassSummaryProps<I> {
  values: I;
  goNext: () => void;
  goPrevious: NavFunctions<I>['goPrevious'];
}

const ClassSummary: React.FunctionComponent<ClassSummaryProps<HostClassState>> =
  ({ values, goPrevious, goNext }) => {
    const validated = validateValues(values);
    return (
      <Block size="sm">
        <Paper>
          <ClassCategoriesQuery>
            {classCategoriesResult => (
              <DetailsSection
                values={values.details}
                classCategoriesResult={classCategoriesResult}
              />
            )}
          </ClassCategoriesQuery>
          {!validated.details &&
            <Text error><i>Class details must be provided to continue</i></Text>
          }

          <Divider marginTop={2} marginBottom={2} />

          <ContactSection values={values.contact} />
          {!validated.contact &&
            <Text error><i>Contact details must be provided to continue</i></Text>
          }

          <Divider marginTop={2} marginBottom={2} />

          <SessionsSection values={values.sessions} />
          {!validated.sessions &&
            <Text error><i>There must be at least one valid session</i></Text>
          }

        </Paper>
        <Navigation
          goPrevious={() => goPrevious()}
          goNext={goNext}
          goNextText="Confirm"
          goNextIsDisabled={!validated.details || !validated.contact || !validated.sessions} />
      </Block>
    );
  };

type Validations = {
  [key in keyof HostClassState]: boolean;
};

type ValidateValuesFn = (values: HostClassState) => Validations;

const validateValues: ValidateValuesFn = ({ details, contact, sessions }) => {
  return {
    details: validationSchemas.details.isValidSync(details),
    contact: validationSchemas.contact.isValidSync(contact),
    sessions: validationSchemas.sessions.isValidSync(sessions),
  };
};

export default ClassSummary;