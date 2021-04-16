import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { Button, Icon } from 'semantic-ui-react';

export default function RecordView() {
    const {
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ audio: true });

    const [buttonState, setButtonState] = useState('Record Yourself');

    const handleRecorder = () => {
        if (buttonState == 'Record Yourself') {
            startRecording();
            setButtonState('Stop Recording...');
        } else {
            stopRecording();
            setButtonState('Record Yourself');
        }
    };

    return (
        <div>
            <Button color="red" size="huge" onClick={handleRecorder}>
                {buttonState}
                <Icon name="record right" />
            </Button>
            <audio src={mediaBlobUrl} controls />
        </div>
    );
}
