import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/core'
import {faCopy, faTrashAlt, faEye} from '@fortawesome/free-solid-svg-icons'
import {memo} from 'react'
import {useDispatch} from 'react-redux'

import {
  copyScenario,
  createVariant,
  deleteVariant,
  editVariantName
} from 'lib/actions/project'
import message from 'lib/message'

import {ConfirmDialog} from './confirm-button'
import Editable from './editable'
import IconButton from './icon-button'

type VariantProps = {
  showVariant: (index: number) => void
  variants: string[]
}

const isValidName = (s) => s && s.length > 0

export default memo<VariantProps>(function Variants({showVariant, variants}) {
  const dispatch = useDispatch()

  return (
    <>
      <Button
        borderRadius={0}
        isFullWidth
        leftIcon='small-add'
        onClick={() =>
          dispatch(
            createVariant(`${message('variant.name')} ${variants.length + 1}`)
          )
        }
        variantColor='green'
      >
        {message('variant.createAction')}
      </Button>
      <Stack p={2}>
        <Text p={2}>{message('variant.description')}</Text>

        <Divider />

        <Stack spacing={3} pt={2}>
          <Flex px={4}>
            <Text flex='1' fontWeight='bold'>
              {message('variant.baseline')}
            </Text>
            <Tooltip
              aria-label='Baseline (empty scenario) cannot be modified'
              label='Baseline (empty scenario) cannot be modified'
            >
              <Box>
                <Icon name='lock' />
              </Box>
            </Tooltip>
          </Flex>
          {variants.map((name, index) => (
            <Box key={index}>
              <Variant
                copyVariant={() => dispatch(copyScenario(index))}
                deleteVariant={() => dispatch(deleteVariant(index))}
                index={index}
                name={name}
                onChangeName={(name) =>
                  dispatch(editVariantName({index, name}))
                }
                showVariant={() => showVariant(index)}
              />
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  )
})

function Variant({
  copyVariant,
  deleteVariant,
  index,
  name,
  onChangeName,
  showVariant
}) {
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <Flex align='center' pl={4} pr={2}>
      {isOpen && (
        <ConfirmDialog
          action={message('variant.delete')}
          description={message('variant.deleteConfirmation')}
          onClose={onClose}
          onConfirm={deleteVariant}
        />
      )}

      <Text mr={2}>{index + 1}.</Text>
      <Box flex='1' fontWeight='bold'>
        <Editable isValid={isValidName} onChange={onChangeName} value={name} />
      </Box>
      <Stack isInline spacing={0}>
        <IconButton
          icon={faEye}
          label={message('variant.showModifications')}
          onClick={showVariant}
        />
        <IconButton icon={faCopy} label='Copy scenario' onClick={copyVariant} />
        {index !== 0 && (
          <IconButton
            icon={faTrashAlt}
            label={message('variant.delete')}
            onClick={onOpen}
            variantColor='red'
          />
        )}
      </Stack>
    </Flex>
  )
}
