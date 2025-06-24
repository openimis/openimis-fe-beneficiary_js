import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Form,
  formatMessage,
  formatMessageWithValues,
  useHistory,
  useModulesManager,
} from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import BenefitPackageTabPanel from '../components/BenefitPackageTabPanel';
import BenefitPackagePlanPanel from '../components/BenefitPackagePlanPanel';
import { RIGHT_BENEFICIARY_SEARCH } from '../constants';
import BenefitPackageIndividualPanel from '../components/BenefitPackageIndividualPanel';
import {
  fetchBeneficiary,
  fetchBeneficiariesGroup,
  clearBeneficiary,
  clearBeneficiariesGroup,
} from '../actions';
import {
  fetchBenefitPlan,
  clearBenefitPlan,
} from '@openimis/fe-benefit_plan';
import BenefitPackageGroupPanel from '../components/BenefitPackageGroupPanel';

const styles = (theme) => ({
  page: theme.page,
});

function BenefitPackagePage({
  rights,
  intl,
  classes,
  beneficiaryUuid,
  beneficiary,
  fetchedBeneficiary,
  benefitPlanUuid,
  benefitPlan,
  fetchedBenefitPlan,
  groupBeneficiariesUuid,
  groupBeneficiaries,
  fetchedGroupBeneficiaries,
}) {
  const history = useHistory();
  const modulesManager = useModulesManager();
  const dispatch = useDispatch();
  const dependenciesFetched = (fetchedBeneficiary || fetchedGroupBeneficiaries) && fetchedBenefitPlan;

  const back = () => history.goBack();

  const fetchData = () => {
    if (beneficiaryUuid) {
      dispatch(fetchBeneficiary(modulesManager, { beneficiaryId: beneficiaryUuid }));
    }
    if (benefitPlanUuid) {
      dispatch(fetchBenefitPlan(modulesManager, [`id: "${benefitPlanUuid}"`]));
    }
    if (groupBeneficiariesUuid) {
      dispatch(fetchBeneficiariesGroup(modulesManager, { groupBeneficiariesId: groupBeneficiariesUuid }));
    }
  };

  const clearData = () => {
    if (beneficiaryUuid) {
      dispatch(clearBeneficiary());
    }
    if (benefitPlanUuid) {
      dispatch(clearBenefitPlan());
    }
    if (groupBeneficiariesUuid) {
      dispatch(clearBeneficiariesGroup());
    }
  };

  useEffect(() => {
    fetchData();
    return clearData;
  }, [beneficiaryUuid, benefitPlanUuid, groupBeneficiariesUuid]);

  const configurePanels = (beneficiaryUuid) => {
    const individualPanelLabel = formatMessageWithValues(
      intl,
      'beneficiary',
      'benefitPackage.Individual.pageTitle',
      {
        firstName: beneficiary?.individual?.firstName,
        lastName: beneficiary?.individual?.lastName,
      },
    );
    const groupPanelLabel = formatMessage(intl, 'beneficiary', 'benefitPackage.GroupPanel.title');

    return {
      panel: beneficiaryUuid ? BenefitPackageIndividualPanel : BenefitPackageGroupPanel,
      title: beneficiaryUuid ? individualPanelLabel : groupPanelLabel,
    };
  };

  const panelsConfig = configurePanels(beneficiaryUuid);
  return (
    <div className={classes.page}>
      {dependenciesFetched && (
      <Form
        module="beneficiary"
        title={panelsConfig.title}
        openDirty
        back={back}
        HeadPanel={panelsConfig.panel}
        Panels={
          rights.includes(RIGHT_BENEFICIARY_SEARCH) ? [BenefitPackagePlanPanel, BenefitPackageTabPanel] : []
        }
        benefitPlanTitle={formatMessageWithValues(
          intl,
          'beneficiary',
          'benefitPlan.pageTitle',
          {
            code: benefitPlan?.code,
            name: benefitPlan?.name,
          },
        )}
        rights={rights}
        intl={intl}
        history={history}
        modulesManager={modulesManager}
        beneficiary={beneficiary}
        benefitPlan={benefitPlan}
        groupBeneficiaries={groupBeneficiaries}
        readOnly
      />
      )}
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
  beneficiaryUuid: props.match.params.beneficiary_uuid,
  beneficiary: state.beneficiary.beneficiary,
  fetchedBeneficiary: state.beneficiary.fetchedBeneficiary,
  benefitPlanUuid: props.match.params.benefit_plan_uuid,
  benefitPlan: state.beneficiary.benefitPlan,
  fetchedBenefitPlan: state.beneficiary.fetchedBenefitPlan,
  groupBeneficiariesUuid: props.match.params.group_beneficiaries_uuid,
  groupBeneficiaries: state.beneficiary.group,
  fetchedGroupBeneficiaries: state.beneficiary.fetchedGroup,
});

export default injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, null)(
  BenefitPackagePage,
))));
