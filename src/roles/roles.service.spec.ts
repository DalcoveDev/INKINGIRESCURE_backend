import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

describe('RolesService', () => {
  let service: RolesService;
  let repository: Repository<Role>;

  const mockRoleRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    repository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const createRoleDto: CreateRoleDto = {
        id: '1',
        name: 'admin',
        level: 1,
      };

      const role = new Role();
      Object.assign(role, createRoleDto);

      mockRoleRepository.create.mockReturnValue(role);
      mockRoleRepository.save.mockResolvedValue(role);

      const result = await service.create(createRoleDto);

      expect(result).toEqual(role);
      expect(mockRoleRepository.create).toHaveBeenCalledWith(createRoleDto);
      expect(mockRoleRepository.save).toHaveBeenCalledWith(role);
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const roles = [
        { id: '1', name: 'admin', level: 1 },
        { id: '2', name: 'user', level: 2 },
      ];

      mockRoleRepository.find.mockResolvedValue(roles);

      const result = await service.findAll();

      expect(result).toEqual(roles);
      expect(mockRoleRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single role', async () => {
      const role = { id: '1', name: 'admin', level: 1 };

      mockRoleRepository.findOne.mockResolvedValue(role);

      const result = await service.findOne('1');

      expect(result).toEqual(role);
      expect(mockRoleRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      const updateRoleDto: UpdateRoleDto = { name: 'updated' };

      mockRoleRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update('1', updateRoleDto);

      expect(result).toEqual({ affected: 1 });
      expect(mockRoleRepository.update).toHaveBeenCalledWith('1', updateRoleDto);
    });
  });

  describe('remove', () => {
    it('should remove a role', async () => {
      mockRoleRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove('1');

      expect(result).toEqual({ affected: 1 });
      expect(mockRoleRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});