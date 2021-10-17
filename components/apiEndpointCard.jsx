import React, { useState } from 'react';
import ExpandableCard from './expandableCard';

export default function ApiEndpointCard(props) {
  const {
    endpoint: {
      name,
      path,
      method,
      body,
      successResponse: {
        code: successCode,
        data: successData,
      },
      errorResponses,
    },
    children: customInformation,
  } = props;

  const [expanded, setExpanded] = useState(false);

  if (!expanded) {
    return (
      <ExpandableCard expanded={expanded} expandedToggle={setExpanded} title={name}>
        <p className="mt-4 text-l">
          {path}
        </p>
      </ExpandableCard>
    );
  }

  if (expanded) {
    return (
      <ExpandableCard expanded={expanded} expandedToggle={setExpanded} title={name}>
        <div className="flex flex-col divide-y-2 divide-purple-50 w-full">
          <div className="overflow-x-auto">
            <h3 className="mt-6 mb-4 text-xl font-bold">Path</h3>
            <p className="mb-6">{path}</p>
          </div>
          <div className="overflow-x-auto">
            <h3 className="mt-6 mb-4 text-xl font-bold">Method</h3>
            <p className="mb-6">{method}</p>
          </div>
          <div className="overflow-x-auto">
            <h3 className="mt-6 mb-4 text-xl font-bold">Body</h3>
            <pre className="mb-6">{JSON.stringify(body, null, 2)}</pre>
          </div>
          <div className="overflow-x-auto">
            <h3 className="mt-6 mb-4 text-xl font-bold">Success Code</h3>
            <p className="mb-6">{successCode}</p>
          </div>
          {
            successData ?
              <div className="overflow-x-auto">
                <h3 className="mt-6 mb-4 text-xl font-bold">Success Data</h3>
                <pre className="mb-6">{JSON.stringify(successData, null, 2)}</pre>
              </div>
            :
              null
          }
          <div className="overflow-x-auto">
            <h3 className="mt-6 mb-4 text-xl font-bold">Possible Errors</h3>
            {
              errorResponses.map((errorResponse) => {
                const {
                  code: errorCode,
                  reason,
                } = errorResponse;

                return (
                  <React.Fragment key={errorCode}>
                    <p className="mt-4 text-l">
                      Error Code: {errorCode} &rarr; Reason: {reason}
                    </p>
                  </React.Fragment>
                );
              })
            }
          </div>
          <div className="overflow-x-auto">
            <h3 className="mt-6 mb-4 text-xl font-bold">More Information</h3>
            {customInformation}
          </div>
        </div>
      </ExpandableCard>
    );
  }
}
