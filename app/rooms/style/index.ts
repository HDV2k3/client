import styled from 'styled-components';
import { Button } from 'antd';

const BaseButton = styled(Button)`
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    font-size: 0.875rem;
    font-weight: 500;
    focus: outline-none;
    focus: ring 2px;
    focus: ring-offset 2px;
    focus: ring #6366f1;
`;

const RefreshButton = styled(BaseButton)`
    border: 1px solid #d1d5db;
    color: #374151;
    background-color: #ffffff;

    &:hover {
        background-color: #f9fafb;
    }
`;

const SubmitButton = styled(BaseButton)`
    color: #ffffff;
    background-color: #4f46e5;

    &:hover {
        background-color: #4338ca;
    }
`;

export {
    BaseButton,
    RefreshButton,
    SubmitButton
}
